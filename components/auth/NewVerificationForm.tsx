"use client";

import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./CardWrapper";
import { BeatLoader } from "react-spinners";
import { useCallback, useEffect } from "react";
interface NewVerificationFormProps {}
export function NewVerificationForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onSubmit = useCallback(() => {
    console.log({ token });

    // check the token expires

    // verification the tokne and expires the current token
  }, [token]);

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
        <BeatLoader />
      </div>
    </CardWrapper>
  );
}
