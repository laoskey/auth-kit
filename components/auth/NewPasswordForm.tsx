"use client";
import * as Z from "zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "./CardWrapper";
import { NewPasswordSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";

// interface LoginFormProps {}
export function NewPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const form = useForm<Z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, SetSuccess] = useState<string | undefined>("");
  const onSubmit = (values: Z.infer<typeof NewPasswordSchema>) => {
    // Another ways to use restfulapi
    // axios.post("your/api/route",values).then().then()
    setError("");
    SetSuccess("");
    console.log(values);

    startTransition(() =>
      reset(values).then((data) => {
        setError(data?.error);
        // TODO :ADd then we add 2FA
        SetSuccess(data?.success);
      })
    );
  };
  return (
    <CardWrapper
      headerLabel='Enter your new password?'
      backButtonLabel='Back to login'
      backButtonHref='/login'
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'
        >
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='******'
                      type='password'
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            className='w-full'
            type='submit'
            disabled={isPending}
          >
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
