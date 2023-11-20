
import Image from 'next/image';

export default function AboutMe() {

    return (
        <>
            <div className="about-me">
                <Image src="/me.png" height={200} width={200} alt="me" />
                <h3>Hi I am Alex!</h3>
                <p>
                    This is my playground website to try cool things!
                </p>
                <p>
                    Currently COO @ <a href="https://www.tangia.co/">Tangia</a>
                </p>
            </div>

        </>
    )
}