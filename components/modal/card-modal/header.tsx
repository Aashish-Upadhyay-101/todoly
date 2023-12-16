"use client";

import { ElementRef, useRef, useState } from "react";
import { CardWithList } from "@/types";
import { FormInput } from "@/components/form/form-input";
import { Layout } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { toast } from "sonner";

interface HeaderProps {
  data: CardWithList;
}

export const Header = ({ data }: HeaderProps) => {
  const [title, setTitle] = useState<string>(data?.title);
  const inputRef = useRef<ElementRef<"input">>(null);
  const queryClient = useQueryClient();
  const params = useParams();

  const { execute: executeUpdateCard } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });
      toast.success(`Card ${data.title} renamed`);
      setTitle(data.title);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("cardId") as string;
    const boardId = params.boardId as string;

    if (title == data.title) {
      return;
    }

    executeUpdateCard({ boardId, title, id });
  };

  return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
      <Layout className="w-5 h-5 mt-1 text-neutral-700" />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            id="title"
            ref={inputRef}
            onBlur={onBlur}
            defaultValue={title}
            className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input truncate"
          />
          <input hidden id="cardId" name="cardId" defaultValue={data.id} />
          <button hidden type="submit" />
        </form>
        <p className="text-sm text-muted-foreground mt-1">
          in list <span className="underline">{data.list.title}</span>
        </p>
      </div>
    </div>
  );
};
