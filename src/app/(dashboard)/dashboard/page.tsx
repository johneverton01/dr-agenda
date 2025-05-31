import { DashboardController } from "@/controllers/DashboardController";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SignOutButton } from "./components/SignOutButton";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/authentication");
  }

  const clinics = await DashboardController().getClinicByUsers(session.user.id);
  if (clinics.length === 0) {
    redirect("clinic-form")
  }
 
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome to your dashboard! { session?.user?.name }</p>
        <SignOutButton />
      </div>
    </div>
  );
}