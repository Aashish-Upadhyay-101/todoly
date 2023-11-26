"use client";

import { ElementRef, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import FormPicker from "./form-picker";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { FormInput } from "@/components/form/form-input";
import FormSubmit from "@/components/form/form-submit";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
  align?: "start" | "center" | "end";
}

export default function FormPopover({
  children,
  side = "bottom",
  sideOffset = 0,
  align,
}: FormPopoverProps) {
  const closeRef = useRef<ElementRef<"button">>(null);
  const router = useRouter();

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success("Board created!");
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },

    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;

    execute({ title, image });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className="w-64 md:w-80 pt-3">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create Board
        </div>

        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant={"ghost"}>
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>

        <form className="space-y-4" action={onSubmit}>
          <div className="space-y-4">
            <FormPicker id="image" errors={fieldErrors} />
            <FormInput
              id="title"
              label="Board title"
              type="text"
              errors={fieldErrors}
            />
            <FormSubmit className="w-full ">Create</FormSubmit>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
