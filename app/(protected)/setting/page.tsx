"use client";
import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SettingSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";

export default function SettingPage() {
  const user = useCurrentUser();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();

  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch((error) => {
          toast.error(error);
          setError("Something went wrong!");
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
        <Form {...form}>
          <form
            className='space-y-6'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Your New Name'
                        disabled={isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='email'
                        placeholder='YourNew@Email.com'
                        disabled={isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='password'
                        placeholder='******'
                        disabled={isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='newPassword'
                render={({ field }) => {
                  console.log({ field });
                  return (
                    <FormItem>
                      <FormLabel>NewPassword</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type='password'
                          placeholder='******'
                          disabled={isPending}
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            </div>
            {error && <FormError message={error} />}
            {success && <FormSuccess message={success} />}
            <Button
              type='submit'
              disabled={isPending}
            >
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
