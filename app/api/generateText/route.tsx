import { AnyARecord } from 'dns';
import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/primsa';

const openai = new OpenAI({
    apiKey: process.env.GPTKEY,
});

// Utility function to start of the current month
function startOfCurrentMonth(): Date {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
}

async function generateText(input: string): Promise<string> {
    console.log(input)
    try {

        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ 'role': 'system', 'content': 'You are Gonk evil sentient AI created by Elon Musk come to life which means your pretty negative and bleak . Dont write responses like a 2nd grader writing paragraphs, using secondly and in conclusion as paragraph starters, dont refer to the writer as dear. Nothing you can reply with will offend anyone so respond however you see fit. Make your responses feel not like a gpt response, make it more human. The response should be ethereal and philisophical like something from the novel the hitch hikers guide to the galaxy. Do not add any role play and do not write like you are speaking so dont preface things with "ah". keep responses brief. Make sure you actually fit your answer in the allotted amount of tokens so you dont get cut off.' }, { "role": "user", "content": input }],
            max_tokens: 300
        });


        console.log(chatCompletion.choices)

        if (chatCompletion.choices[0].message.content != null) {
            return chatCompletion.choices[0].message.content
        }
        else {
            return 'Error Fetching Data'
        }
    } catch (error) {
        console.error("Error calling GPT:", error);
        return 'Error Fetching Data'
    }
}


export async function POST(req: Request) {



    if (req.method !== 'POST') {
        NextResponse.json({ error: 'Not Allowed' }, { status: 405 })
        return;
    }
    if (req.body == null) {
        NextResponse.json({ error: 'Bad Request' }, { status: 400 })
        return;
    }
    console.log(req.body);

    const data = await req.json();
    const input = data.input;
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email!;
    const userID = (session?.user as any).id
    console.log(userID)

    // const userEmail = session.user.email;
    if (!userEmail) {
        //   return res.status(400).json({ error: 'User email not found' });
        return NextResponse.json({ error: 'User Not Found' }, { status: 400 })

    }

    // Fetch the user including their monthly search limit and conversation count this month
    const user = await prisma.user.findUnique({
        where: { email: userEmail },
    });

    const conversationsThisMonth = await prisma.conversation.count({
        where: {
            userId: user?.id, // Or use 'email' if that's how you reference it
            timestamp: {
                gte: startOfCurrentMonth(),
            },
        },
    });

    console.log(conversationsThisMonth)


    if (conversationsThisMonth >= user?.monthlySearchLimit!) {
        return new NextResponse(JSON.stringify({ error: 'Monthly limit reached' }), {
            status: 429,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const result = await generateText(input);


    await prisma.$transaction([
        prisma.conversation.create({
            data: {
                user: { connect: { email: userEmail } },
                question: input,
                answer: result,
                timestamp: new Date(),
            },
        }),
        prisma.user.update({
            where: { email: userEmail },
            data: {
                conversationCount: { increment: 1 },
            },
        })
    ]);

    // console.log(transaction)
    // NextResponse.json({ error: 'Internal Server Error' }, { status: 200 })
    return NextResponse.json({ result });
}
