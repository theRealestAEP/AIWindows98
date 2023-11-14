'use client';

import { useState } from "react";
import DraggableBox from "./draggable"

interface User {
    name: string;
    email: string;
    id: string;
    conversationCount: number;
    monthlySearchLimit: number;
    image: string;
}


interface StuffIMadeProps {
    user: User;
    onClose: () => void;
}



export default function StuffIMade({ user, onClose }: StuffIMadeProps) {


    const [isBoxVisible, setBoxVisible] = useState(true);
    const [setPostion, setResultPosition] = useState({ x: 800, y: 200 });
    const foodAnalyzer = 'https://chat.openai.com/g/g-a6gcdmXYA-food-analyzer'
    const handleDrag = (newX: number, newY: number) => {
        setResultPosition({ x: newX, y: newY });
    };

    const handleClose = () => {
        setBoxVisible(false);
        if (onClose) onClose(); // If an onClose function is provided, call it
    };

    const openIframe = () => {
        return;
    }

    return (
        <>
            {isBoxVisible && (
                <DraggableBox
                    x={setPostion.x}
                    y={setPostion.y}
                    height={100}
                    width={600}
                    onDrag={handleDrag}
                    isResizable={false}
                >
                    <div className="win98-window">

                        <div className="win98-title-bar">
                            <span className="win98-title-text">Stuff I Made</span>
                            <div className='titleBar'>
                                <button onClick={handleClose} className="closeButton">X</button>
                            </div>
                        </div>
                        <div className="win98-menu-bar">
                            <ul>
                                <li>File</li>
                                <li>Edit</li>
                                <li>View</li>
                                <li>Go</li>
                                <li>Favorites</li>
                                <li>Help</li>
                                <li className="win98-status-bar-refresh">Refresh</li>
                            </ul>
                        </div>
                        <div className="win98-address-bar">
                            Address: <input type="text" value="C:\Its Not Great" readOnly />
                        </div>
                        <div className="win98-explorer">

                            <div className="win98-folder" onClick={() => openIframe()}>
                                <div className="win98-folder-icon"></div>
                                <div className="win98-folder-label">Food Analyzer</div>
                            </div>
                        </div>
                        <div className="win98-status-bar">
                            <span className="win98-status-text">Status: Ready</span>
                        </div>
                    </div>
                </DraggableBox>
            )}

        </>
    )

}


{/* <div key={index} className="win98-folder" onClick={() => openFolder(conversation)}>
<div className="win98-folder-icon"></div>
<div className="win98-folder-label">{formatDate(conversation.timestamp)}</div>
</div> */}