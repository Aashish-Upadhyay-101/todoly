"use client";

import { useProModal } from "@/hooks/use-pro-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";

export const ProModal = () => {
  const proModal = useProModal();

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleSubscription = () => {
    execute({});
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl">
            Upgrade to Todoly Premium Today!
          </h2>
          <p className="text-xs font-semibold text-neutral-600">
            Explore the best of Todoly
          </p>
          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li>Unlimited boards</li>
              <li>Advance checklists</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button
            className="w-full"
            variant={"primary"}
            disabled={isLoading}
            onClick={handleSubscription}>
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
