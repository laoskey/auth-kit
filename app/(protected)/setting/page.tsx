"use client";
import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
// import { useCurrentUser } from "@/hooks/use-current-user";
// import { useSession } from "next-auth/react";
export default function SettingPage() {
  // const session = useSession();
  // const user = useCurrentUser();
  const onClick = () => {
    logout();
  };
  return (
    <div
      className=' bg-white p-10 rounded-xl
    '
    >
      <Button
        type='submit'
        onClick={onClick}
        variant={"ghost"}
      >
        Sign out
      </Button>
    </div>
  );
}
