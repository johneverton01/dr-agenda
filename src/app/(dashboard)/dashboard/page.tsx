import { getDashboard } from "@/data/getDashboards";
import { auth } from "@/lib/auth";
import dayjs from "dayjs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { appointmentsTableColumns } from "../appointments/components/TableColumns";
import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "../components/PageTemplate";
import { AppointmentsByDays } from "./components/AppointmentsByDays";
import { AppointmentsChats } from "./components/AppointmentsChart";
import { DatePicker } from "./components/DatePicker";
import { StatsCards } from "./components/StatsCards";
import { TopDoctors } from "./components/TopDoctors";
import { TopSpecialties } from "./components/TopSpecialties";

interface DashboardPageProps {
  searchParams: Promise<{
    from: string;
    to: string;
  }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/authentication");
  }

  if (!session.user.clinic) {
    redirect("/clinic-form");
  }

   const { from, to } = await searchParams;
  if (!from || !to) {
    redirect(
      `/dashboard?from=${dayjs().format("YYYY-MM-DD")}&to=${dayjs().add(1, "month").format("YYYY-MM-DD")}`,
    );
  }
  const {
    totalRevenue,
    totalAppointments,
    totalPatients,
    totalDoctors,
    topDoctors,
    topSpecialties,
    todayAppointments,
    dailyAppointmentsData,
  } = await getDashboard({
    from,
    to,
    session: {
      user: {
        clinic: {
          id: session.user.clinic.id,
        },
      },
    },
  });

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Dashboard</PageTitle>
          <PageDescription>Tenha uma visão geral da sua clínica</PageDescription>
        </PageHeaderContent>
        <PageActions>
          <DatePicker />
        </PageActions>
      </PageHeader>
      <PageContent>
        <StatsCards
          totalRevenue={totalRevenue.total ? Number(totalRevenue.total) : null}
          totalAppointments={totalAppointments.total}
          totalPatients={totalPatients.total}
          totalDoctors={totalDoctors.total}
        />

        <div className="grid grid-cols-[2.25fr_1fr] gap-4">
          <AppointmentsChats dailyAppointmentsData={dailyAppointmentsData} />
          <TopDoctors
            doctors={topDoctors}
          />
        </div>
        <div className="grid grid-cols-[2.25fr_1fr] gap-4">
          <AppointmentsByDays 
            todayAppointments={todayAppointments}
            appointmentsTableColumns={appointmentsTableColumns} 
          />
          <TopSpecialties topSpecialties={topSpecialties} />
        </div>
      </PageContent>
    </PageContainer>
  );
}
