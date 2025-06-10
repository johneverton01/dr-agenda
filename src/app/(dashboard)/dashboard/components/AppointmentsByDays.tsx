import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Calendar } from "lucide-react";

interface AppointmentsByDaysProps<TData, TValue = unknown> {
  todayAppointments: TData[];
  appointmentsTableColumns: ColumnDef<TData, TValue>[];
}

export function AppointmentsByDays<TData, TValue = unknown>({
  todayAppointments,
  appointmentsTableColumns,
}: AppointmentsByDaysProps<TData, TValue>) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Calendar className="text-muted-foreground" />
          <CardTitle className="text-base">Agendamentos de hoje</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={appointmentsTableColumns}
          data={todayAppointments}
        />
      </CardContent>
    </Card>
  );
}
