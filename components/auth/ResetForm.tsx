"use client";
import * as Z from "zod";
import { useForm } from "react-hook-form";
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
import { ResetSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";
import { login } from "@/actions/login";
import { reset } from "@/actions/reset-password";

// interface LoginFormProps {}
export function ResetForm() {
  const form = useForm<Z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, SetSuccess] = useState<string | undefined>("");
  const onSubmit = (values: Z.infer<typeof ResetSchema>) => {
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
      headerLabel='Forgot your password?'
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
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='lao@example.com'
                      type='email'
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
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
