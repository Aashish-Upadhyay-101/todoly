import { db } from "@/lib/db";
import { Form } from "./_components/form";

export default async function OrganizationIdPage() {
  const boards = await db.board.findMany();

  return (
    <div className="space-y-4">
      <Form />
      {boards.map((board) => (
        <p>{board.title}</p>
      ))}
    </div>
  );
}
