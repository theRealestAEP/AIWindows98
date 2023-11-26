import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { prisma } from '@/lib/primsa'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
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
                <BrowserView>
                    <AboutMe />
                    <div className="flash-text">
                        Login to the playground
                    </div>

                    <Desktop user={user} />
                </BrowserView>
                <MobileView>
                    <AboutMe />
                </MobileView>
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
                {/* <GenerateSearch user={user} />
                <PastSearches user={user} /> */}
                <Desktop user={user} />
            </div>
        )
    }

}


