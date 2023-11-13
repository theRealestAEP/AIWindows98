import React, { useState, useCallback, useRef } from 'react';
import { useZIndex } from './zIndexContext';

interface DraggableBoxProps {
    children: React.ReactNode;
    x: number;
    y: number;
    height: number;
    width: number;
    onDrag: (newX: number, newY: number) => void;
    isResizable: boolean;
    maxChildHeight?: number;
    maxChildWidth?: number;
    
}

const DraggableBox: React.FC<DraggableBoxProps> = ({ children,  height, width, x, y, onDrag, isResizable, maxChildHeight, maxChildWidth }) => {
    const [size, setSize] = useState({ width: width, height: height });
    const ref = useRef<HTMLDivElement>(null);
    const mouseDownRef = useRef<{ x: number; y: number, type: 'drag' | 'resize' }>();

    const { bringToFront } = useZIndex();
    const [zIndex, setZIndex] = useState(0); // Default zIndex value
    const bringBoxToFront = useCallback(() => {
        const newZIndex = bringToFront();
        setZIndex(newZIndex);
      }, [bringToFront]);
    

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

    const handleMouseDownDrag = useCallback((event: React.MouseEvent) => {
        bringToFront();
        handleMouseDown(event.nativeEvent, 'drag');
    }, [handleMouseDown]);




    return (
        <div
            onMouseDown={bringBoxToFront} 
            ref={ref}
            style={{
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                width: `${size.width}px`,
                height: `${size.height}px`,
                minHeight: isResizable ? '200px' : '5px',
                minWidth: isResizable ? '300px' : '5px',
                resize: isResizable ? 'both' : 'none',
                maxHeight: maxChildHeight ? maxChildHeight : 'none',
                maxWidth: maxChildWidth ? maxChildWidth : 'none',
                zIndex:zIndex,
                // overflow: 'auto',
            }}
        >
            <div onMouseDown={handleMouseDownDrag} style={{ width: '100%', height: '100%' }}>
                {children}
            </div>
            {isResizable && (
                <div
                    onMouseDown={(e) => {
                        setZIndex(bringToFront());
                        handleMouseDown(e.nativeEvent, 'resize');
                    }}
                    style={{
                        position: 'absolute',
                        backgroundImage: 'url("/cornericon.png")', // Correct the path and use `url()`
                        backgroundPosition: 'bottom right', // Position the background image at the bottom right
                        backgroundSize: 'cover', // Cover the entire area of the element
                        width: '20px',
                        height: '20px',
                        bottom: '0',
                        right: '0',
                        border: '1px solid grey',
                        marginRight: '1px',
                        marginBottom: '1px',
                        cursor: 'nwse-resize',
                        // backgroundColor: 'lightslategrey'
                      }}
                />
            )}
        </div>
    );
};

export default DraggableBox;
