'use client';
import { useEffect, useState } from 'react';
import DraggableBox from './draggable';
import { Anybody } from 'next/font/google';
interface Conversation {
    question: string;
    timestamp: string; // or Date, depending on how you're handling dates
    answer: string;
}
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
    const [curPage, setPage] = useState(0);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [setPostion, setResultPosition] = useState({ x: 800, y: 200 });
    const [setOpenPostion, setOpenResultPosition] = useState({ x: 300, y: 500 });
    const [isBoxVisible, setBoxVisible] = useState(true);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

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

    const closePage = () => {
        setSelectedConversation(null)
    }

    const handleBoxDrag = (newX: number, newY: number) => {
        setOpenResultPosition({ x: newX, y: newY });
    };


    const openFolder = (conversation: Conversation) => {
        setSelectedConversation(conversation);
    };

    const fetchConversations = async () => {
        setLoading(true);
        
        if(user.id=='0'){
            // setConversations('Guest - login to see history');
            setError('Guest - login to see history')
            setLoading(false);
            return;
        }   
        try {
            const response = await fetch(`/api/getPastConvos?page=${curPage}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setConversations(data);
        } catch (err: any) {
            setError(err.message);
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchConversations = async () => {
            setLoading(true);
        
            if(user.id=='0'){
                // setConversations('Guest - login to see history');
                setError('Guest - login to see history')
                setLoading(false);
                return;
            }   
            try {
                const response = await fetch(`/api/getPastConvos?page=${curPage}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setConversations(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchConversations();
    }, [curPage]);

    const formatDate = (timestamp: any) => {
        // Assuming timestamp is in a format that can be parsed by Date constructor
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleDateString("en-US");
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
                            <span className="win98-title-text">My Computer</span>
                            <div className='titleBar'>{selectedConversation?.timestamp}
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
                                <li className="win98-status-bar-refresh" onClick={fetchConversations}>Refresh</li>
                            </ul>
                        </div>
                        <div className="win98-address-bar">
                            Address: <input type="text" value="C:\YourSearches" readOnly />
                        </div>
                        <div className="win98-explorer">
                            {loading && <p>Loading...</p>}
                            {error && <p>Error: {error}</p>}
                            {!loading && !error && conversations.length > 0 && (
                                conversations.map((conversation, index) => (
                                    <div key={index} className="win98-folder" onClick={() => openFolder(conversation)}>
                                        <div className="win98-folder-icon"></div>
                                        <div className="win98-folder-label">{formatDate(conversation.timestamp)}</div>
                                    </div>
                                ))
                            )}
                            {!loading && !error && conversations.length === 0 && <p>No conversations found.</p>}
                        </div>
                        <div className="win98-status-bar">
                            <span className="win98-status-text">Status: Ready</span>
                        </div>
                    </div>
                </DraggableBox>
            )}

            {selectedConversation && (
                <DraggableBox
                    x={setOpenPostion.x}
                    y={setOpenPostion.y}
                    height={200}
                    width={200}
                    onDrag={handleBoxDrag}
                    isResizable={true}
                    maxChildHeight={500}
                    maxChildWidth={1000}

                >
                    <div className="win98-textbox">
                        <div className='titleBar'>{selectedConversation.timestamp}
                            <div onClick={closePage} className='closeButton'>X</div>
                        </div>
                        <div className='win98-textbox-text'>
                            <h3>{selectedConversation.question}</h3>
                            <p>{selectedConversation.answer}</p>
                        </div>
                    </div>
                </DraggableBox>
            )}

        </>
    );
};