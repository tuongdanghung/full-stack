import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const data = [
  { id: 1, desc: "lorem 1", startDate: "20/11/2023", endDate: "18/12/2023" },
  { id: 2, desc: "lorem 2", startDate: "20/11/2023", endDate: "18/12/2023" },
  { id: 3, desc: "lorem 3", startDate: "20/11/2023", endDate: "18/12/2023" },
];

const YourComponent = () => {
  const [items, setItems] = useState(data);

  const handleDragEnd = (result: any) => {
    const newItems = Array.from(items);
    const [movedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, movedItem);

    setItems(newItems);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="items">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id.toString()}
                index={index}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div>
                      <h3>{item.desc}</h3>
                      <p>Start date: {item.startDate}</p>
                      <p>End date: {item.endDate}</p>
                    </div>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default YourComponent;
