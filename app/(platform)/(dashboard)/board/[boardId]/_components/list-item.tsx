"use client";

import { ElementRef, useRef, useState } from "react";
import { ListWithCards } from "@/types";
import ListHeader from "./list-header";
import { CardForm } from "./card-form";
import { cn } from "@/lib/utils";
import CardItem from "./card-item";

interface ListItemProps {
  index: number;
  list: ListWithCards;
}

export default function ListItem({ index, list }: ListItemProps) {
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader onAddCard={enableEditing} list={list} />
        <ol
          className={cn(
            "mx-1 py-0.5 px-1 flex flex-col gap-y-2",
            list.cards.length > 0 ? "mt-2" : "mt-0"
          )}>
          {list.cards.map((card, index) => (
            <CardItem index={index} key={card.id} card={card} />
          ))}
        </ol>
        <CardForm
          listId={list.id}
          ref={textareaRef}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
        />
      </div>
    </li>
  );
}
