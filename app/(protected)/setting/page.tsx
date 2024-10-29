import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

// interface SettingPageProps {}
export default async function SettingPage() {
  const session = await auth();

  return (
    <div>
      SettingPage {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type='submit'>Sign out</Button>
      </form>
    </div>
  );
}
