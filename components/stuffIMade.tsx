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
        contentUrl: "https://chat.openai.com/g/g-dQ7BHeWRe-food-analyzer",
        x: 800,
        y: 200,
        isOpen: false,
        icon: '/foodScanner.png'
    },
    {
        id: 2,
        title: "Dec Talk",
        contentUrl: "https://dec-talk.com/",
        x: 800,
        y: 200,
        isOpen: false,
        icon: '/decTalkIcon.png'
    },
    {
        id: 3,
        title: "Tangia",
        contentUrl: "https://tangia.co/",
        x: 800,
        y: 300,
        isOpen: false,
        icon: '/tangiaPixel.png'
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

    const openIframe = (url: string) => {
        return <IframeComponent height={300} width={580} url={url} />;
    };

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
                            <div className='titleBar'>
                            <span className="win98-title-text">Stuff I Made</span>
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
                                    <div className="win98-stuffIMade-icon" 
                                        style={{backgroundImage: `url(${item.icon})`}}
                                    ></div>
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
                    height={600}
                    width={800}
                    onDrag={(newX, newY) => handleDynamicDrag(item.id, newX, newY)}
                    isResizable={false}
                >
                    <div className="win98-browser-window">

                        <div className="win98-title-bar">
                            <span className="win98-title-text">{item.title}</span>
                            <div className='titleBar'>
                                <button onClick={() => toggleWindow(item.id)} className="closeButton" >X</button>
                            </div>
                        </div>
                        <div className="win98-browser-window-open">
                            {/* Render content based on item properties */}
                            {/* open an iframe box*/}
                            {/* Include a close button or method to toggle isOpen */}
                            {item.contentUrl && openIframe(item.contentUrl)}
                            {/* <button onClick={() => toggleWindow(item.id)}>Close</button> */}
                        </div>

                    </div>
                </DraggableBox>
            ))}

        </>
    )

}
