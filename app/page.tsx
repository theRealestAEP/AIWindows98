import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { prisma } from '@/lib/primsa'
import Desktop from '@/components/Desktop';
import AboutMe from '../components/aboutMe';


export default async function Page() {
    const session = await getServerSession(authOptions);
    // console.log(session)

    if (!session) {
        const user = {
            id: '0',
            name: 'Guest',
            email: ''
        }
        return (
            <div>
                <AboutMe />
                <Desktop user={user} />

            </div>

        )
    }
    else {
        const currentUserId = (session?.user as any).id

        const user = await prisma.user.findUnique({
            where: { id: currentUserId },
        });
        // console.log(user)
        return (
            <div>
                <AboutMe />
                    <Desktop user={user} />
 
            </div>
        )
    }

}


