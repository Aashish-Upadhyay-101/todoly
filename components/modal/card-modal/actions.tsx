import { deleteCard } from "@/actions/delete-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { useCardModal } from "@/hooks/use-card-modal";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface ActionsProps {
  data: CardWithList;
}

export default function Actions({ data }: ActionsProps) {
  const cardModal = useCardModal();
  const params = useParams();
  const queryClient = useQueryClient();

  const { execute: executeDelete } = useAction(deleteCard, {
    onSuccess: (data) => {
      toast.success(`Card ${data.title} deleted`);
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleDeleteCard = () => {
    cardModal.onClose();
    const boardId = params.boardId as string;

    executeDelete({ id: data.id, boardId });
  };

  return (
    <div className="space-y-2 mt-2">
      <p className="text-sm font-semibold">Actions</p>
      <Button variant={"destructive"} size={"sm"} onClick={handleDeleteCard}>
        Delete
      </Button>
    </div>
  );
}

Actions.Skeleton = function ActionSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="h-7 w-16" />
      <Skeleton className="h-12 w-20" />
    </div>
  );
};
