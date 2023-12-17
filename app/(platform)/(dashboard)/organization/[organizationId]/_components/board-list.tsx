import FormPopover from "@/components/form/form-popover";
import Hint from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";
import { MAX_FREE_BOARDS } from "@/constants/boards";
import { db } from "@/lib/db";
import { getAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { HelpCircle, User2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function BoardList() {
  const { orgId } = auth();

  if (!orgId) {
    return redirect("/select-org");
  }

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const availableCount = await getAvailableCount();
  const isPro = await checkSubscription();

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-neutral-700 text-lg">
        <User2 className="h-6 w-6 mr-2" /> Your boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-col-4 gap-4">
        {boards.map((board) => (
          <Link
            href={`/board/${board.id}`}
            className="aspect-video group relative bg-no-repeat bg-center bg-cover rounded-sm h-full w-full p-2 overflow-hidden bg-sky-700"
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}>
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
            <p className="font-semibold text-white relative">{board.title}</p>
          </Link>
        ))}
        <FormPopover side="right" sideOffset={10}>
          <div
            role="button"
            className="flex flex-col items-center justify-center hover:opacity-75 transition rounded-sm h-full w-full bg-muted gap-y-1 aspect-video relative">
            <p className="text-sm">Create new board</p>
            <span className="text-xs text-muted-foreground">
              {isPro
                ? "Unlimited"
                : `${MAX_FREE_BOARDS - availableCount} remaining`}
            </span>
            <Hint
              description={`Free Workspace can have up to 5 boards. For unlimited boards upgrade this workspace`}
              side="bottom"
              sideOffset={40}>
              <HelpCircle className="w-4 h-4 absolute right-2 bottom-2" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
}

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-col-4 gap-4">
      <Skeleton className="rounded-sm h-full w-full aspect-video" />
      <Skeleton className="rounded-sm h-full w-full aspect-video" />
      <Skeleton className="rounded-sm h-full w-full aspect-video" />
      <Skeleton className="rounded-sm h-full w-full aspect-video" />
      <Skeleton className="rounded-sm h-full w-full aspect-video" />
      <Skeleton className="rounded-sm h-full w-full aspect-video" />
    </div>
  );
};
