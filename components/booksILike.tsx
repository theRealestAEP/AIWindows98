import { useEffect, useState } from 'react';
import DraggableBox from './draggable';
import Image from 'next/image';

interface User {
    name: string;
    email: string;
    id: string;
    conversationCount: number;
    monthlySearchLimit: number;
    image: string;
}


interface PastSearchesProps {
    user: User;
    onClose: () => void;
}



export default function PastSearches({ user, onClose }: PastSearchesProps) {
    const [setPostion, setResultPosition] = useState({ x: 800, y: 200 });
    const [setOpenPostion, setOpenResultPosition] = useState({ x: 300, y: 500 });
    const [isBoxVisible, setBoxVisible] = useState(true);

    const handleClose = () => {
        setBoxVisible(false);
        if (onClose) onClose(); // If an onClose function is provided, call it
    };
    // const handleClose = () => {
    //     setBoxVisible(false); // This function will be passed down to DraggableBox to close it
    // };

    const handleDrag = (newX: number, newY: number) => {
        setResultPosition({ x: newX, y: newY });
    };

    return (
        <>
            <DraggableBox
                x={setPostion.x}
                y={setPostion.y}
                height={100}
                width={600}
                onDrag={handleDrag}
                isResizable={false}
            >
                <div className="win98-browser-window">
                    <div className="titleBar">
                        <span className="win98-title-text">My Computer</span>
                        <button className="closeButton" onClick={handleClose}>X</button>
                    </div>
                    <div className="win98-bookreview-window">
                        <div className="book-content">
                            <div className='image-container'>
                                <Image src={"/CoddlingOfAmericanMind.png"} alt={'coddling of the American Mind'} height={100} width={100} />
                            </div>
                            <div>
                                <h1 className="book-title">The Coddling of the American Mind</h1>
                                <p className="book-thoughts">
                                    Written by  by Greg Lukianoff and Jonathan Haidt. A great blend of current culture and REAL solutions. After I finished I felt like I had been through a dozen therapy sessions. 10/10
                                </p>
                            </div>
                        </div>
                        <div className="book-content">
                            <div className='image-container'>
                                <Image src={"/humblePi.png"} alt={'coddling of the American Mind'} height={100} width={100} />
                            </div>
                            <div>
                                <h1 className="book-title">Humble Pi</h1>
                                <p className="book-thoughts">
                                    Written by Matt Parker. I fuck up often and this book made me feel better about it!
                                </p>
                            </div>
                        </div>
                        <div className="book-content">
                            <div className='image-container'>
                                <Image src={"/daivdAndGoliath.png"} alt={'coddling of the American Mind'} height={100} width={100} />
                            </div>
                            <div>
                                <h1 className="book-title">The Coddling of the American Mind</h1>
                                <p className="book-thoughts">
                                    It's Malcolm Gladwell so... always well researched and well spoken. I could probably add the whole Gladwellian collection to this list honestly.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </DraggableBox>

        </>
    );
};