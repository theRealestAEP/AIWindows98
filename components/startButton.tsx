import Image from 'next/image';
export default function StartButton(){
    return (
        <div className="start-button">
            <Image src="/start.png" height={100} width={100} alt="windows logo" />
        </div>
    )
}