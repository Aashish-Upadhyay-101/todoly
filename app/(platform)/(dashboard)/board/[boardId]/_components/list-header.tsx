"use client";

import { ElementRef, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { List } from "@prisma/client";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { updateList } from "@/actions/update-list";
import { toast } from "sonner";

interface ListheaderProps {
  list: List;
}

export default function ListHeader({ list }: ListheaderProps) {
  const [title, setTitle] = useState<string>(list.title);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const { execute, fieldErrors } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed to ${data.title}`);
      setTitle(data.title);
      disableEditing();
    },

    onError: (error) => {
      toast.error(error);
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      //  force a synchronous update to the DOM
      // because state changes are asynchronous is react, this will make that behaviour Sync
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  const onBlur = () => {
    console.log("hello");
    formRef.current?.requestSubmit();
  };

  const handleSubmit = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    const title = formData.get("title") as string;

    if (title === list.title) {
      return disableEditing();
    }

    execute({ id, title, boardId });
  };

  useEventListener("keydown", onKeyDown);

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form ref={formRef} action={handleSubmit} className="flex-1 px-[2px]">
          <input hidden readOnly id="id" name="id" value={list.id} />
          <input
            hidden
            readOnly
            id="boardId"
            name="boardId"
            value={list.boardId}
          />
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            errors={fieldErrors}
            placeholder="Enter list title..."
            defaultValue={title}
            className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          />

          <button type="submit" hidden />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent">
          {title}
        </div>
      )}
    </div>
  );
}
