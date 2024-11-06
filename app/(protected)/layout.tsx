import React from "react";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  return (
    <div className='min-h-screen min-w-screen flex items-center justify-center  bg-gradient-to-tr from-sky-400 to-blue-400'>
      {children}
    </div>
  );
}
