"use client";

import { copyList } from "@/actions/copy-list";
import { deleteList } from "@/actions/delete-list";
import FormSubmit from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { MoreHorizontal, X } from "lucide-react";
import { ElementRef, useRef } from "react";
import { toast } from "sonner";

interface ListOptionsProps {
  list: List;
  onAddCard: () => void;
}

export default function ListOptions({ list, onAddCard }: ListOptionsProps) {
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List ${data.title} deleted`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`List ${data.title} copied`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = (formData: FormData) => {
    const listId = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeDelete({ id: listId, boardId });
  };

  const onCopy = (formData: FormData) => {
    const listId = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeCopy({ id: listId, boardId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant={"ghost"}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center pb-4 text-neutral-400">
          List actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="p-2 absolute top-2 right-2 text-neutral-600 h-auto w-auto"
            variant={"ghost"}>
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant={"ghost"}>
          Add Card...
        </Button>
        <form action={onCopy}>
          <input hidden name="id" id="id" value={list.id} />
          <input hidden name="boardId" id="boardId" value={list.boardId} />
          <FormSubmit
            variant={"ghost"}
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm">
            Copy list
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input hidden name="id" id="id" value={list.id} />
          <input hidden name="boardId" id="boardId" value={list.boardId} />
          <FormSubmit
            variant={"ghost"}
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm">
            Delete this list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
}
