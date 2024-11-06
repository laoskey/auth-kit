"use client";
import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
// interface SettingPageProps {}
export default function SettingPage() {
  const session = useSession();
  const onClick = () => {
    // signOut();
    logout();
  };
  return (
    <div>
      SettingPage {JSON.stringify(session)}
      <Button
        type='submit'
        onClick={onClick}
      >
        Sign out
      </Button>
    </div>
  );
}
