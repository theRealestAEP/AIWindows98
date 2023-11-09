'use Client';

import {useSession } from "next-auth/react";


export default function AuthProvider({ children }: {children : React.ReactDOM}) {
    const {data: session, status} = useSession();

    console.log(session, status)

    if(status === 'authenticated'){
        return <>{children}</>
    }
    else{
        return<></>
    }
}