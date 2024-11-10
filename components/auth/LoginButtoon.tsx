"use client";

import { useRouter } from "next/navigation";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { LoginForm } from "./LoginForm";

interface LoginButtoonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}
export function LoginButtoon({
  children,
  mode,
  asChild,
}: LoginButtoonProps) {
  const router = useRouter();

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTitle className='hidden'></DialogTitle>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className='p-0 w-auto bg-transparent border-none'>
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  const onCLick = () => {
    // router.push("/auth/login");
    router.push("/login");
  };
  return (
    <span
      onClick={onCLick}
      className=' cursor-pointer'
    >
      {children}
    </span>
  );
}
