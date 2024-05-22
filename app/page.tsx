"use client"
import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Draggable } from './draggable/Draggable';
import { Droppable } from './droppable/Droppable';
import { SortableItem } from './draggable/SortableItem';

const Page = () => {
  const containerId = 'A';
  const [items, setItems] = useState<string[]>([]); // IDs of the draggable items inside the droppable area

  const draggableItems = ['1', '2', '3']; // IDs of the initial draggable items

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    if (active.data.current?.droppable) {
      // Reorder inside the droppable area
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    } else if (over.id === containerId) {
      // Add to droppable area
      setItems((items) => {
        return [...items, active.id];
      });
    }
  };

  const [flex, setFlex] = useState(true)
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div style={{ marginBottom: '1rem' }}>
        {draggableItems.map((id) => (
          <Draggable key={id} id={id} droppable={false}>
            {`Draggable ${id}`}
          </Draggable>
        ))}
      </div>

      <button onClick={() => setFlex(!flex)}>flex?</button>

      <Droppable id={containerId}>
        <div>Drop here</div>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className={`${flex ? "flex " : ""} gap-4`}>
            {items.map((id) => (
              <SortableItem key={id} id={id} droppable={true}>
                {`Draggable ${id}`}
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </Droppable>
    </DndContext>
  );
};

export default Page;