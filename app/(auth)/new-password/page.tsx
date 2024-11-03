"use client";
import { useSearchParams } from "next/navigation";

// interface pageProps {}
export default function NewPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  return <div>{token}</div>;
}
