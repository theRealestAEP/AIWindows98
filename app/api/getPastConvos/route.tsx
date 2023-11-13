import { NextResponse, NextRequest } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/primsa';

export async function GET(req: NextRequest) {
    if (req.method !== 'GET') {
        return NextResponse.json({ error: 'Not Allowed' }, { status: 405 });
    }
    // console.log(req)

    // Parse query parameters using req.nextUrl.searchParams
    const page = parseInt(req.nextUrl.searchParams.get('page') || '0');
    const pageSize = 12;

    // Fetch the session
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userID = (session?.user as any).id

    try {
        const conversations = await prisma.conversation.findMany({
            where: { userId: userID },
            orderBy: { timestamp: 'desc' },
            take: pageSize,
            skip: page * pageSize,
        });

        return NextResponse.json(conversations);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
