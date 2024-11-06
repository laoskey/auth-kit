import { auth } from "@/auth";

// interface ServerPageProps {}
const ServerPage = async () => {
  const session = await auth();

  return <div>{JSON.stringify(session)}</div>;
};
export default ServerPage;
