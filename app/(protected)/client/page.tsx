"use client";
import { UserInfo } from "@/components/ui/UserInfo";
import { useCurrentUser } from "@/hooks/use-current-user";

// interface ServerPageProps {}
const ClientPage = () => {
  const user = useCurrentUser();

  return (
    <UserInfo
      label='🌏 Client component'
      user={user}
    />
  );
};
export default ClientPage;
