import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
interface HeaderProps {
  label: string;
}
export function Header({ label }: HeaderProps) {
  return (
    <div className='w-full  flex flex-col items-center justify-center'>
      <h1
        className={cn(
          "text-3xl font-semibold flex items-baseline gap-2 relative",
          font.className
        )}
      >
        <Image
          src={"/svgs/locked-svgrepo-com.svg"}
          alt=''
          width={25}
          height={25}
        />
        Auth
      </h1>
      <p className='text-muted-foreground text-sm'>{label}</p>
    </div>
  );
}
