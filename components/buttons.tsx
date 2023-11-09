'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import Image from 'next/image';
import Link from "next/link";

export function SignInButton (){
    const {data: session, status} = useSession();
    console.log(session, status)

    if(status === 'loading'){
        return <>...</>
    }

    if (status === 'authenticated') {
        return (
            <Link href="/">
                    <Image
                        src={session.user?.image ?? '/mememan.webp'}
                        alt="Github"
                        width={30}
                        height={30}
                    />
            </Link>
        );
    }

    return <button onClick={() => signIn()}>Sign In</button>;
}

export function SingOutButton (){
    const {data: session, status} = useSession();
    if (status === 'authenticated') {
        return (
            <button onClick={() => signOut()} >Sign Out</button>
        );
    }
}

