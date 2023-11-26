"use client";

import { createBoard } from "@/actions/create-board";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";

export function Form() {
  const { execute, fieldErrors } = useAction(createBoard, {
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title });
  };

  return (
    <form action={onSubmit}>
      <FormInput id="title" label="Board Title" errors={fieldErrors} />
      <Button type={"submit"}>Save</Button>
    </form>
  );
}
