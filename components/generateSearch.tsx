"use client";
import { useState } from 'react';
import DraggableBox from './draggable';
import Image from 'next/image'

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


export default function GenerateSearch({ user, onClose }: PastSearchesProps) {
    const [inputText, setInputText] = useState('');  // New state for the input text
    const [result, setResult] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);  // State to keep track of loading
    const [userInfoPosition, setUserInfoPosition] = useState({ x: 10, y: 20 });
    const [resultPosition, setResultPosition] = useState({ x: 800, y: 200 });
    const [userConversationCount, setUserConversationCount] = useState(user.conversationCount);
    const [isBoxVisible, setBoxVisible] = useState(true);
    const [resultErr, setResultErr] = useState(false);


    const handleClose = () => {
        setBoxVisible(false);
        if (onClose) onClose(); // If an onClose function is provided, call it
    };

    const handleCloseResult = () => {
        setResult(null)
    };

    const handleUserInfoDrag = (newX: number, newY: number) => {
        setUserInfoPosition({ x: newX, y: newY });
    };

    const handleResultDrag = (newX: number, newY: number) => {
        setResultPosition({ x: newX, y: newY });
    };

    async function handleButtonClick() {

        setIsLoading(true);  // Start loading
        try {
            const response = await fetch('/api/generateText', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ input: `${user?.name} said: ${inputText}` }),
            });

            if (!response.ok) {
                console.error('Network response was not ok', response);
                const data = await response.json();
                setResult(data.error);
                setResultErr(true)
                return;
            }

            const data = await response.json();
            // console.log(data.result);
            setResultErr(false)
            setResult(data.result);
        } catch (error) {
            console.error('Error fetching data: ', error);
        } finally {
            if (!resultErr) {
                setUserConversationCount(userConversationCount + 1)
            }
            setIsLoading(false);  // Stop loading regardless of the result
        }
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {  // New handler for the input change
        setInputText(event.target.value);
    }
    if (user.id == '0') {
        return (
            <>
                {isBoxVisible && (
                    <DraggableBox
                        x={userInfoPosition.x}
                        y={userInfoPosition.y}
                        height={100}
                        width={300}
                        onDrag={handleUserInfoDrag}
                        isResizable={false} // Pass the isResizing state
                    >
                        <div className='userInfo'>
                            <div className='titleBar'>Deep Thought
                                <div className='closeButton' onClick={handleClose}>X</div>
                            </div>
                            <div className='user-info-text'>
                                <div>{user?.name ?? 'No Name'}</div>
                            </div>
                            <div className="input-container">
                                <div>
                                    Sign In to Try me out!
                                </div>
                            </div>
                        </div>
                    </DraggableBox>

                )}
            </>
        )

    }

    if (user.id != '0') {
        return (

            <>
                {isBoxVisible && (
                    <DraggableBox
                        x={userInfoPosition.x}
                        y={userInfoPosition.y}
                        height={100}
                        width={300}
                        onDrag={handleUserInfoDrag}
                        isResizable={false} // Pass the isResizing state
                    >
                        <div className='userInfo'>
                            <div className='titleBar'>Deep Thought
                                <div className='closeButton' onClick={handleClose}>X</div>
                            </div>
                            <div className='user-info-text'>
                                <div>{user?.name ?? 'No Name'}</div>
                                <div>Searches: {userConversationCount}</div>
                            </div>
                            <div className="input-container">
                                <input id='text' type="text" value={inputText} onChange={handleInputChange} />  {/* Set the value and onChange props */}
                                <button onClick={handleButtonClick} disabled={isLoading}>
                                    {isLoading ? 'Loading...' : 'Generate Text'}
                                </button>

                            </div>
                        </div>
                    </DraggableBox>
                )}
                {isBoxVisible && (
                    <div className="container">
                        {isLoading ? (
                            <DraggableBox
                                x={resultPosition.x}
                                y={resultPosition.y}
                                height={200}
                                width={200}
                                onDrag={handleResultDrag}
                                isResizable={true} // Pass the isResizing state
                                maxChildHeight={500}
                                maxChildWidth={1000}
                            >
                                <div className='win98-textbox'>
                                    <div className='titleBar'>The Answer
                                        <div className='closeButton' onClick={handleCloseResult}>X</div>
                                    </div>
                                    <div className='search-loading-image'>
                                        <Image src="/loadingAnimation.gif" alt="Loading..." />
                                    </div>
                                </div>

                            </DraggableBox>
                        ) : result && (
                            <div>
                                <DraggableBox
                                    x={resultPosition.x}
                                    y={resultPosition.y}
                                    height={200}
                                    width={200}
                                    onDrag={handleResultDrag}
                                    isResizable={true} // Pass the isResizing state
                                    maxChildHeight={500}
                                    maxChildWidth={1000}
                                >
                                    <div className='win98-textbox'>
                                        <div className='titleBar'>The Answer
                                            <div className='closeButton' onClick={handleCloseResult}>X</div>
                                        </div>
                                        {/* Resizable handle implementation */}
                                        <div className='win98-textbox-text'>
                                            {result}
                                        </div>
                                    </div>

                                </DraggableBox>
                            </div>
                        )}
                    </div>
                )}
            </>
        )
    }
}
