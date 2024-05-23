"use client"
import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Draggable } from './draggable/Draggable';
import { Droppable } from './droppable/Droppable';

const Page = () => {
  const containerId = 'A';
  const [items, setItems] = useState<{ id: string; key: string }[]>([]); // Object with id and unique key

  const draggableItems = ['1', '2', '3']; // IDs of the initial draggable items

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    if (active.data.current?.droppable) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => item.key === active.id);
        const newIndex = items.findIndex(item => item.key === over.id);

        if (oldIndex !== newIndex) {
          const updatedItems = [...items];
          const [movedItem] = updatedItems.splice(oldIndex, 1);
          updatedItems.splice(newIndex, 0, movedItem);

          return updatedItems;
        }

        return items;
      });
    } else if (over.id === containerId) {

      // settea el id con date.now, podria hacerse con nanoid o algo por el estilo
      const newKey = `${active.id}-${Date.now()}`;
      setItems((items) => {
        return [...items, { id: active.id, key: newKey }];
      });
    }
  };

  const [flex, setFlex] = useState(true);

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
        <div className={`${flex ? "flex " : ""} gap-4`}>
          {items.map(({ id, key }) => (
            <Draggable key={key} id={key} droppable={true}>
              {`Draggable ${id}`}
            </Draggable>
          ))}
        </div>
      </Droppable>
    </DndContext>
  );
};

export default Page;
