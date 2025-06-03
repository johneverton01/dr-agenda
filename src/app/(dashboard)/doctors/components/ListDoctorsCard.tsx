import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DoctorCard } from "./DoctorCard";

export async function ListDoctorsCard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  if (!session.user.clinic) {
    redirect("/clinic-form");
  }

  const doctors = await db.query.doctorsTable.findMany({
    where: eq(doctorsTable.clinicId, session.user.clinic?.id),
  })

  return (
    <div className="flex gap-4 flex-wrap space-y-4">
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          doctor={doctor}
          />
      ))}
      {doctors.length === 0 && (
        <div className="w-full p-4 text-center text-gray-500">
          Nenhum médico cadastrado. Adicione um médico para começar.
        </div>
      )}
    </div>
  )
}