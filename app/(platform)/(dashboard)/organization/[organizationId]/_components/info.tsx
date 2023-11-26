"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import Image from "next/image";

export default function Info() {
  const { organization, isLoaded } = useOrganization();
  if (!isLoaded) {
    return <Info.Skeleton />;
  }

  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Image
          src={organization?.imageUrl!}
          fill
          alt="organization"
          className="rounded-md object-cover"
        />
      </div>
      <div className="space-y-1">
        <p className="text-xl font-semibold">{organization?.name}</p>
        <div className="flex items-center text-muted-foreground text-xs">
          <CreditCard className="w-3 h-3 mr-1" />
          Free
        </div>
      </div>
    </div>
  );
}

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex items-center gap-x-4">
      <Skeleton className="w-[60px] h-[60px]" />
      <div className="space-y-2">
        <Skeleton className="w-36 h-5" />
        <Skeleton className="w-14 h-3" />
      </div>
    </div>
  );
};
