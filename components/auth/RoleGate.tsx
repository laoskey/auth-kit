"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import React from "react";
import { FormError } from "../FormError";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}
export function RoleGate({ children, allowedRole }: RoleGateProps) {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <FormError message='You do not have permission to view this content' />
    );
  }
  return <>{children}</>;
}
