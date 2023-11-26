import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HintProps {
  children: React.ReactNode;
  description: string;
  side?: "right" | "left" | "top" | "bottom";
  sideOffset?: number;
}

export default function Hint({
  children,
  description,
  side,
  sideOffset,
}: HintProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          className="text-xs max-w-[220px] break-words"
          side={side}
          sideOffset={sideOffset}>
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
