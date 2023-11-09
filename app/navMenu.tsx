'use client';
import { SignInButton, SingOutButton } from "@/components/buttons";
// import AuthProvider from "./AuthProvider";

export default function NavMenu() {
    return (

            <nav className="win98-navbar">
                <ul>
                    <li>
                        <SignInButton />
                    </li>
                    <li>
                        <SingOutButton />
                    </li>
                </ul>
            </nav>

    )
}