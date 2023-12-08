"use client";

import { ListWithCards } from "@/types";
import ListForm from "./list-form";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import ListItem from "./list-item";

interface ListContainerProps {
  boardId: string;
  lists: ListWithCards[];
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export default function ListContainer({ boardId, lists }: ListContainerProps) {
  const [orderedData, setOrderedData] = useState<ListWithCards[]>(lists);

  useEffect(() => {
    setOrderedData(lists);
  }, [lists]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    // drag and drop at the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // drag and drop at different destination
    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );

      setOrderedData(items);

      // TODO: server action to save the new order
    }

    // user move card of the list
    if (type === "card") {
      const newOrderedData = [...orderedData];

      // source list
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );

      // destination list
      const destinationList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destinationList) {
        return;
      }

      // check if the card exists in source list
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      // check if the card exists in destination list
      if (!destinationList.cards) {
        destinationList.cards = [];
      }

      // moving the card within the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        ).map((card, index) => ({ ...card, order: index }));

        sourceList.cards = reorderedCards;
        setOrderedData(newOrderedData);
        // TODO: trigger server action of this case
      } else {
        // move the card to another list

        // delete the card from the source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        // change the order in the source list
        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });

        // assign new listId to the moved card
        movedCard.listId === destination.droppableId;

        // add the card to the destination list
        destinationList.cards
          .splice(destination.index, 0, movedCard)
          .map((card, index) => ({ ...card, order: index }));
        setOrderedData(newOrderedData);

        // TODO: trigger server action for this case
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full">
            {orderedData.map((list, index) => (
              <ListItem key={list.id} index={index} list={list} />
            ))}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
}
