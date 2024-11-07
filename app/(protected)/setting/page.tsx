"use client";
import { useTransition } from "react";
import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSession } from "next-auth/react";

export default function SettingPage() {
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();
  const onClick = () => {
    startTransition(() => {
      settings({
        name: "NEW TTTT",
      }).then(() => update());
    });
  };
  return (
    <Card className='w-[600px]'>
      <CardHeader>
        <p className=' text-2xl font-semibold text-center'>
          🌑 Settings
        </p>
      </CardHeader>
      <CardContent>
        <Button
          disabled={isPending}
          onClick={onClick}
        >
          Update name
        </Button>
      </CardContent>
    </Card>
  );
}
