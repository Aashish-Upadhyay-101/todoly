"use client";

import { createBoard } from "@/actions/create-board";
import { useAction } from "@/hooks/use-action";
import { useFormState } from "react-dom";

export function Form() {
  const { execute, fieldErrors } = useAction(createBoard, {
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title });
  };

  return (
    <form action={onSubmit}>
      <input
        id="title"
        name="title"
        placeholder="Enter your board name"
        className="border p-1 rounded-lg outline-gray-300"
        required
      />

      {fieldErrors?.title?.map((error) => (
        <div className="mt-2">
          <p className="text-red-500">{error}</p>
        </div>
      ))}
    </form>
  );
}
