"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavBarProps {}
export function NavBar() {
  const pathName = usePathname();
  return (
    <nav className='bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm'>
      <div className='flex gap-x-2'>
        {" "}
        <Button
          asChild
          variant={pathName === "/client" ? "default" : "outline"}
        >
          <Link href={"/client"}>Client</Link>
        </Button>
        <Button
          asChild
          variant={pathName === "/setting" ? "default" : "outline"}
        >
          <Link href={"/setting"}>Settings</Link>
        </Button>
        <Button
          asChild
          variant={pathName === "/server" ? "default" : "outline"}
        >
          <Link href={"/server"}>Server</Link>
        </Button>
        <Button
          asChild
          variant={pathName === "/admin" ? "default" : "outline"}
        >
          <Link href={"/admin"}>Admin</Link>
        </Button>
      </div>
      <p>User button</p>
    </nav>
  );
}
