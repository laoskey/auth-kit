"use client";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

export function Social() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const onCLick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGGIN_REDIRECT,
    });
  };

  return (
    <div className='flex items-center w-full gap-x-2'>
      <Button
        size={"lg"}
        className='w-full'
        variant={"outline"}
        onClick={() => onCLick("google")}
      >
        <FcGoogle />
      </Button>
      <Button
        size={"lg"}
        className='w-full'
        variant={"outline"}
        onClick={() => onCLick("github")}
      >
        <FaGithub />
      </Button>
    </div>
  );
}
