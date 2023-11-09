// DraggableBox.tsx
import React, { useState, useCallback, useRef, useEffect } from 'react';

interface DraggableBoxProps {
    children: React.ReactNode;
    x: number;
    y: number;
    onDrag: (newX: number, newY: number) => void;
}

const DraggableBox: React.FC<DraggableBoxProps> = ({ children, x, y, onDrag }) => {
    const ref = useRef<HTMLDivElement>(null);
    const mouseDownRef = useRef<{ x: number; y: number }>();

    const isPartOf = (target: HTMLElement, className: string): boolean => {
        while (target && target !== ref.current) {
            if (target.classList.contains(className)) {
                return true;
            }
            target = target.parentNode as HTMLElement;
        }
        return false;
    };


    // This is the native event handler version without the `React` prefix on `MouseEvent`.
    const onMouseMove = useCallback((event: MouseEvent) => {
        if (mouseDownRef.current) {
            const newX = event.clientX - mouseDownRef.current.x;
            const newY = event.clientY - mouseDownRef.current.y;
            onDrag(newX, newY);
        }
    }, [onDrag]);

    const onMouseUp = useCallback(() => {
        mouseDownRef.current = undefined;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    }, [onMouseMove]);

    // Original React event handler
    const handleReactMouseDown = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            const target = event.target as HTMLElement;
            if (isPartOf(target, 'win98-textbox') ||
                isPartOf(target, 'win98-textbox-text') ||
                isPartOf(target, 'resize-handle')) {
                return;
            }

            onMouseDown(event.nativeEvent);  // Pass the native event to the native handler
        },
        []
    );

    // This is a native event handler for `mousedown` event.
    const onMouseDown = (event: MouseEvent) => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            mouseDownRef.current = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
            };
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        }
    };

    // Attach the event listener for mouse down and clean up on unmount using the native handler
    useEffect(() => {
        const currentRef = ref.current;
        if (currentRef) {
            currentRef.addEventListener('mousedown', onMouseDown);
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener('mousedown', onMouseDown);
            }
        };
    }, [onMouseDown]);

    return (
        <div
            ref={ref}
            onMouseDown={handleReactMouseDown}
            style={{
                position: 'absolute',
                cursor: 'move',
                left: `${x}px`,
                top: `${y}px`,
                // Add any additional style you may need
            }}
        >
            {children}
        </div>
    );
};

export default DraggableBox;