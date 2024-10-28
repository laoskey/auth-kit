import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='h-full min-h-screen flex items-center justify-center  bg-gradient-to-tr from-sky-400 to-blue-400'>
      {children}
    </div>
  );
}
