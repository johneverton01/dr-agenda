import { db } from "@/db";
export function DashboardController() {
  const getClinicByUsers = async (userId: string) => {
    const clinics = await db.query.usersToClinicsTable.findMany({
      where: (clinics, { eq }) => eq(clinics.userId, userId),
    });
    return clinics;
  };

  return {
    getClinicByUsers,
  }
}
