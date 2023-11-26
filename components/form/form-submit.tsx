import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";

interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

export default function FormSubmit({
  disabled,
  className,
  children,
  variant,
}: FormSubmitProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      className={cn(className)}
      type="submit"
      variant={variant}
      size={"sm"}
      disabled={pending || disabled}>
      {children}
    </Button>
  );
}
