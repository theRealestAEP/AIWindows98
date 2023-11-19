'use client';

import { useState } from "react";
import DraggableBox from "./draggable"
import IframeComponent from './iframeComponent'

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

const stuffIMade = [
    {
        id: 1,
        title: "Food Analyzer",
        contentUrl: "https://chat.openai.com/g/g-a6gcdmXYA-food-analyzer",
        x: 800,
        y: 200,
        isOpen: false,
    },
];

export default function StuffIMade({ user, onClose }: StuffIMadeProps) {

    const [isBoxVisible, setBoxVisible] = useState(true);
    const [setPostion, setResultPosition] = useState({ x: 800, y: 200 });
    const [items, setItems] = useState(stuffIMade);

    const handleDrag = (newX: number, newY: number) => {
        setResultPosition({ x: newX, y: newY });
    };

    const handleDynamicDrag = (id: number, newX: number, newY: number) => {
        setItems(currentItems => currentItems.map(item =>
            item.id === id ? { ...item, x: newX, y: newY } : item
        ));
    };

    const toggleWindow = (id: number) => {
        setItems(currentItems => currentItems.map(item => 
            item.id === id ? { ...item, isOpen: !item.isOpen } : item
        ));
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
                            {items.map(item => (
                                <div
                                    key={item.id}
                                    className="win98-folder"
                                    onClick={() => toggleWindow(item.id)}
                                >
                                    <div className="win98-folder-icon"></div>
                                    <div className="win98-folder-label">{item.title}</div>
                                </div>
                            ))}
                        </div>
                        <div className="win98-status-bar">
                            <span className="win98-status-text">Status: Ready</span>
                        </div>
                    </div>
                </DraggableBox>
            )}
            {items.map(item => item.isOpen && (
                <DraggableBox
                    key={item.id}
                    x={item.x}
                    y={item.y}
                    height={100}
                    width={600}
                    onDrag={(newX, newY) => handleDynamicDrag(item.id, newX, newY)}
                    isResizable={false}
                >
                    {/* Render content based on item properties */}
                    {/* Include a close button or method to toggle isOpen */}
                </DraggableBox>
            ))}

        </>
    )

}


{/* <div key={index} className="win98-folder" onClick={() => openFolder(conversation)}>
<div className="win98-folder-icon"></div>
<div className="win98-folder-label">{formatDate(conversation.timestamp)}</div>
</div> */}