"use client";
import { useState } from 'react';
import DraggableBox from './draggable';

export default function GenerateSearch({ user }: any) {
    const [inputText, setInputText] = useState('');  // New state for the input text
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);  // State to keep track of loading
    const [userInfoPosition, setUserInfoPosition] = useState({ x: 10, y: 20 });
    const [resultPosition, setResultPosition] = useState({ x: 800, y: 200 });
    const [userConversationCount, setUserConversationCount] = useState(user.conversationCount);
    // const [isResizing, setIsResizing] = useState(false); // New state to track resizing

    const handleUserInfoDrag = (newX: number, newY: number) => {
        setUserInfoPosition({ x: newX, y: newY });
    };

    const handleResultDrag = (newX: number, newY: number) => {
        setResultPosition({ x: newX, y: newY });
    };

    // const handleResizeStart = () => {
    //     setIsResizing(true);
    // };

    // const handleResizeEnd = () => {
    //     setIsResizing(false);
    // };




    async function handleButtonClick() {

        // console.log('handleButtonClick');
        setIsLoading(true);  // Start loading
        try {
            const response = await fetch('/api/generateText', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ input: `${user?.name} said: ${inputText}` }),
            });
            
            if (!response.ok) {
                console.error('Network response was not ok', response);
                return;
            }

            const data = await response.json();
            console.log(data.result);
            setResult(data.result);
        } catch (error) {
            console.error('Error fetching data: ', error);
        } finally {
            setUserConversationCount(userConversationCount+1)
            setIsLoading(false);  // Stop loading regardless of the result
        }
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {  // New handler for the input change
        setInputText(event.target.value);
    }


    return (
        <>
            <div className='userInfoStart'>
                <DraggableBox
                    x={userInfoPosition.x}
                    y={userInfoPosition.y}
                    onDrag={handleUserInfoDrag}
                    isResizable={false} // Pass the isResizing state
                >
                    <div className='userInfo'>
                        <div className='titleBar'>You
                            <div className='closeButton'>X</div>
                        </div>
                        <div className='user-info-text'>
                            <div>{user?.name ?? 'No Name'}</div>
                            <div>Searches: {userConversationCount}</div>
                        </div>
                    </div>
                </DraggableBox>
            </div>
            <div className="container">

                <div className="input-container">
                    <input id='text' type="text" value={inputText} onChange={handleInputChange} />  {/* Set the value and onChange props */}
                    <button onClick={handleButtonClick} disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Generate Text'}
                    </button>

                </div>
                {isLoading ? (
                    <div>
                        <img src="/loadingAnimation.gif" alt="Loading..." />
                    </div>
                ) : result && (
                    <div>
                        <DraggableBox
                            x={resultPosition.x}
                            y={resultPosition.y}
                            onDrag={handleResultDrag}
                            isResizable={true} // Pass the isResizing state
                        >
                                <div className='win98-textbox'>
                                    <div className='titleBar'>The Answer
                                        <div className='closeButton'>X</div>
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
        </>
    )
}
