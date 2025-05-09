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
import { LoginSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";
import { login } from "@/actions/login";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// interface LoginFormProps {}
export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAcountNotLinked"
      ? "Email already in use with differrnt provider!"
      : "";

  const form = useForm<Z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });
  const [isPending, startTransition] = useTransition();
  const [show2FA, setShow2FA] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, SetSuccess] = useState<string | undefined>("");
  const onSubmit = (values: Z.infer<typeof LoginSchema>) => {
    // Another ways to use restfulapi
    // axios.post("your/api/route",values).then().then()
    setError("");
    SetSuccess("");

    startTransition(() =>
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          if (data?.success) {
            form.reset();
            SetSuccess(data.success);
          }
          if (data?.twoFactor) {
            setShow2FA(true);
          }
        })
        .catch(() => setError("Something went wrong"))
    );
  };
  return (
    <CardWrapper
      headerLabel='Welecome back'
      backButtonHref='/register'
      backButtonLabel='Dont have an account'
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'
        >
          <div className='space-y-4'>
            {show2FA && (
              <FormField
                control={form.control}
                name='code'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='123456'
                        disabled={isPending}
                        type='text'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!show2FA && (
              <>
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
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='********'
                          type='password'
                          disabled={isPending}
                        />
                      </FormControl>
                      <Button
                        size={"sm"}
                        variant={"link"}
                        asChild
                        className='px-0 font-normal'
                      >
                        <Link href={"/reset"}>Forgot possward?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button
            className='w-full'
            type='submit'
            disabled={isPending}
          >
            {show2FA ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
