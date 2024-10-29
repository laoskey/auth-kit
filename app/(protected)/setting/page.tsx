import { auth } from "@/auth";

// interface SettingPageProps {}
export default async function SettingPage() {
  const session = await auth();
  return <div>SettingPage {JSON.stringify(session)}</div>;
}
