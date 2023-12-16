import { format } from "date-fns";
import { AuditLog } from "@prisma/client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { generateLogMessage } from "@/lib/generate-log-message";

interface ActivityItemProps {
  activity: AuditLog;
}

export const ActivityItem = ({ activity }: ActivityItemProps) => {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={activity?.userImage} />
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold capitalize text-neutral-700">
            {activity?.userName}
          </span>{" "}
          {generateLogMessage(activity)}
        </p>
        <p className="text-xs text-muted-foreground">
          {format(new Date(activity?.createdAt), "MMM d, yyyy 'at' h:mm a")}
        </p>
      </div>
    </li>
  );
};
