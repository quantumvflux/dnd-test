import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortableItem(props: { id: string; children: React.ReactNode; droppable: boolean }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: props.id,
        data: {
            droppable: props.droppable
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className='min-w-fit'>
            {props.children}
        </div>
    );
}