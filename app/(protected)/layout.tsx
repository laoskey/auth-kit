import React from "react";
import { NavBar } from "./_components/NavBar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  return (
    <div className=' min-h-screen flex  flex-col items-center justify-center  bg-gradient-to-tr from-sky-400 to-blue-400'>
      <NavBar />
      <div>{children}</div>
    </div>
  );
}
