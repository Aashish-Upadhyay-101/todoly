import { useCardModal } from "@/hooks/use-card-modal";
import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";

interface CardItemProps {
  index: number;
  card: Card;
}

export default function CardItem({ index, card }: CardItemProps) {
  const cardModal = useCardModal();

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => cardModal.onOpen(card.id)}
          className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm">
          {card.title}
        </div>
      )}
    </Draggable>
  );
}

// you can assign role to div
