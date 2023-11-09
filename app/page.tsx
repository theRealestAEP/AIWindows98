import { getServerSession } from 'next-auth';
import GenerateSearch from '../components/generateSearch'
import { authOptions } from './api/auth/[...nextauth]/route';
import { prisma } from '@/lib/primsa'

export default async function Page() {
    const session = await getServerSession(authOptions);
    console.log(session)

    if (!session) {
        return (
            <div className="container">
                <div>
                    <div className="flash-text">
                        DON'T PANIC
                    </div>
                    <div className='containerArrow'>
                        <div className="arrow">&#x2193;</div>
                    </div>
                </div>
            </div>

        )
    }
    else {
        const currentUserEmail = session?.user?.email!;
        
        const user = await prisma.user.findUnique({
            where: { email: currentUserEmail },
        });
        
        return (
            <div className="container">
                <GenerateSearch user={user} />
            </div>
        )
    }

}


