"use client";

import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./CardWrapper";
import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";
// interface NewVerificationFormProps {}
export function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onSubmit = useCallback(() => {
    // check the token expires
    // verification the tokne and expires the current token
    if (success || error) {
      return;
    }
    if (!token) {
      setError("Missing token");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel='Confirm your verification'
      backButtonLabel='Back to login'
      backButtonHref='/login'
    >
      <div className=' flex items-center w-full justify-center'>
        {!success && !error && <BeatLoader />}

        {!success && <FormError message={error} />}
        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  );
}
