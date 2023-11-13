'use client';
import { SignInButton, SingOutButton } from "@/components/buttons";
// import AuthProvider from "./AuthProvider";
import StartButton from "../components/startButton";
export default function NavMenu() {
    return (

            <nav className="win98-navbar">
                <ul>
                    <li>
                        <StartButton />
                    </li>
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