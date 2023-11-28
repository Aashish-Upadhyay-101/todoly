"use client";

import { updateBoard } from "@/actions/update-board";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Board } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

interface BoardTitleFormProps {
  board: Board;
}

export default function BoardTitleForm({ board }: BoardTitleFormProps) {
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(board.title);

  const { execute, fieldErrors } = useAction(updateBoard, {
    onSuccess: (data) => {
      setTitle(data.title);
      toast.success(`Board ${data.title} updated!`);
      disableEditing();
    },

    onError: (error) => {
      toast.error(error);
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title, id: board.id });
  };

  if (isEditing) {
    return (
      <form action={onSubmit} ref={formRef}>
        <FormInput
          ref={inputRef}
          onBlur={onBlur}
          id="title"
          errors={fieldErrors}
          defaultValue={title}
          className="bg-transparent text-lg h-7 py-1 px-[7px] font-bold border-none focus-visible:outline-none focus-visible:ring-transparent"
        />
      </form>
    );
  }

  return (
    <Button
      onClick={enableEditing}
      variant={"transparent"}
      className="font-bold text-lg h-auto w-auto p-1 px-2">
      {title}
    </Button>
  );
}
