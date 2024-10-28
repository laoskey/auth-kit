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
import { RegisterSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";
import { register } from "@/actions/register";

// interface LoginFormProps {}
export function RegisterForm() {
  const form = useForm<Z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, SetSuccess] = useState<string | undefined>("");
  const onSubmit = (values: Z.infer<typeof RegisterSchema>) => {
    // Another ways to use restfulapi
    // axios.post("your/api/route",values).then().then()
    setError("");
    SetSuccess("");

    startTransition(() =>
      register(values).then((data) => {
        setError(data.error);
        SetSuccess(data.success);
      })
    );
  };
  return (
    <CardWrapper
      headerLabel='Create an account'
      backButtonLabel='Already have an account'
      backButtonHref='/register'
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'
        >
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-[700]'>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Your user name'
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-[700]'>Email</FormLabel>
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
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-[700]'>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='********'
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
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
