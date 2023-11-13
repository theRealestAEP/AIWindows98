import { getServerSession } from 'next-auth';
import GenerateSearch from '../components/generateSearch'
import { authOptions } from './api/auth/[...nextauth]/route';
import { prisma } from '@/lib/primsa'
import PastSearches from '../components/userItems'
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
                <div className="flash-text">
                    Login to the playground
                </div>

                <div>
                    <Desktop user={user} />
                </div>
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
                {/* <GenerateSearch user={user} />
                <PastSearches user={user} /> */}
                <Desktop user={user} />
            </div>
        )
    }

}


