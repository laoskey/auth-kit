"use client";
import { useTransition } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SettingPage() {
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();
  const onClick = () => {
    startTransition(() => {
      settings({
        name: "Something deffirent",
      })
        .then(() => update())
        .catch((error) => {
          toast.error(error);
        });
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
