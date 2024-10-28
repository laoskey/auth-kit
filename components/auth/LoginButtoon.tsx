"use client";

import { useRouter } from "next/navigation";
import React from "react";

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
    return <span> TODO:IMPLEMENT modal</span>;
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
