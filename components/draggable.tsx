import React, { useState, useCallback, useRef, useEffect } from 'react';

interface DraggableBoxProps {
    children: React.ReactNode;
    x: number;
    y: number;
    onDrag: (newX: number, newY: number) => void;
    isResizable: boolean;
}

const DraggableBox: React.FC<DraggableBoxProps> = ({ children, x, y, onDrag, isResizable }) => {
    const [size, setSize] = useState({ width: 200, height: 200 });
    const ref = useRef<HTMLDivElement>(null);
    const mouseDownRef = useRef<{ x: number; y: number, type: 'drag' | 'resize' }>();

    const onMouseMove = useCallback((event: MouseEvent) => {
        if (mouseDownRef.current && ref.current) {
            if (mouseDownRef.current.type === 'drag') {
                const newX = event.clientX - mouseDownRef.current.x;
                const newY = event.clientY - mouseDownRef.current.y;
                onDrag(newX, newY);
            } else if (mouseDownRef.current.type === 'resize') {
                const newWidth = Math.max(100, event.clientX - ref.current.getBoundingClientRect().left);
                const newHeight = Math.max(100, event.clientY - ref.current.getBoundingClientRect().top);
                setSize({ width: newWidth, height: newHeight });
            }
        }
    }, [onDrag]);

    const onMouseUp = useCallback(() => {
        mouseDownRef.current = undefined;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    }, [onMouseMove]);

    const handleMouseDown = useCallback((event: MouseEvent, type: 'drag' | 'resize') => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            mouseDownRef.current = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
                type,
            };
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        }
    }, [onMouseMove, onMouseUp]);


    return (
        <div
            ref={ref}
            style={{
                position: 'absolute',
                cursor: 'move',
                left: `${x}px`,
                top: `${y}px`,
                width: `${size.width}px`,
                height: `${size.height}px`,
                // resize: isResizable ? 'both' : 'none',
                overflow: 'auto',
                minHeight: isResizable ? '200px' : '10px',
                minWidth: isResizable ? '300px' : '10px',
            }}
        >
            <div style={{ width: '100%', height: '100%' }}>
                {children}
            </div>
            {isResizable && (
                <div
                    onMouseDown={(e) => handleMouseDown(e.nativeEvent, 'resize')}
                    style={{
                        position: 'absolute',
                        width: '20px',
                        height: '20px',
                        bottom: '0',
                        right: '0',
                        border: '3px solid grey',
                        marginRight: '5px',
                        marginBottom: '5px',
                        cursor: 'nwse-resize',
                        backgroundColor: 'lightgray', // Visible resize handle
                    }}
                />
            )}
        </div>
    );
};

export default DraggableBox;
