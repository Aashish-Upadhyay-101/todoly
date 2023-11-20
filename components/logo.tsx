import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const logoFont = localFont({
  src: "../public/fonts/calcom.woff2",
});

export function Logo() {
  return (
    <Link href="/">
      <div className="md:flex hover:opacity-75 transition items-center gap-x-2 hidden">
        <Image src="/logo.svg" alt="logo" height={40} width={40} />
        <p className={cn("text-xl text-neutral-700 pb-1", logoFont.className)}>
          Todoly
        </p>
      </div>
    </Link>
  );
}
