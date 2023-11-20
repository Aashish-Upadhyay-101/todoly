import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../../public/fonts/calcom.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function MarketingPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className={cn(
          "flex flex-col justify-center items-center",
          headingFont.className
        )}>
        <div className="flex gap-2 items-center border shadow-sm mb-4 p-4 rounded-full uppercase bg-amber-100 text-amber-700">
          <Medal />
          No 1 task management
        </div>
        <h1 className="text-3xl md:text-6xl text-center mb-6 text-neutral-800">
          Todoly helps team move
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 pb-3 md:pb-4 rounded-md w-fit">
          work forward.
        </div>
      </div>
      <div
        className={cn(
          "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
          textFont.className
        )}>
        Collaborate, manage project, and reach new productivity peaks. From high
        rises to home office, the way your team works in unique - acomplish it
        all with Todoly
      </div>

      <Button
        size={"lg"}
        asChild
        className="mt-6 transition-all bg-gradient-to-r from-slate-800 to-pink-800 hover:from-pink-800 hover:to-slate-800 duration-300">
        <Link href="/sign-up">Get Todoly for free</Link>
      </Button>
    </div>
  );
}
