import FormPopover from "@/components/form/form-popover";
import Hint from "@/components/hint";
import { HelpCircle, User2 } from "lucide-react";
import React from "react";

export default function BoardList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-neutral-700 text-lg">
        <User2 className="h-6 w-6 mr-2" /> Your boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-col-4 gap-4">
        <FormPopover side="right" sideOffset={10}>
          <div
            role="button"
            className="flex flex-col items-center justify-center hover:opacity-75 transition rounded-sm h-full w-full bg-muted gap-y-1 aspect-video relative">
            <p className="text-sm">Create new board</p>
            <span className="text-xs text-muted-foreground">5 remaining</span>
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
