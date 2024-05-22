import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export function Droppable(props: { id: string; children: React.ReactNode }) {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    });
    const style = {
        color: isOver ? 'green' : undefined,
        border: '1px solid black',
        padding: '1rem',
        minHeight: '4rem',
        width: '8rem',
    };

    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
}