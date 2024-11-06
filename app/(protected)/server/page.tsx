import { auth } from "@/auth";
import { UserInfo } from "@/components/ui/UserInfo";
import { currentUser } from "@/lib/auth";

// interface ServerPageProps {}
const ServerPage = async () => {
  const session = await auth();
  const user = await currentUser();

  return (
    <UserInfo
      label='⚡ Server component'
      user={user}
    />
  );
};
export default ServerPage;
