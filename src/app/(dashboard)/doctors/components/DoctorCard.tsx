"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { doctorsTable } from "@/db/schema";
import { formatCurrencyInCents } from "@/helpers/currency";
import { CalendarDays, Clock, DollarSign } from "lucide-react";
import { useState } from "react";
import { getAvailability } from "../helpers/availability";
import { DeleteDoctor } from "./DeleteDoctor";
import { UpsertDoctorForm } from "./UpsertDoctorForm";

interface DoctorCardProps {
  doctor: typeof doctorsTable.$inferSelect,
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}
export function DoctorCard({
  doctor,
  onDelete,
  onEdit,
}: DoctorCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const doctorInitials = doctor.name.split(" ").map((word) => word.charAt(0)).join("").toUpperCase();
  function formatPrice(priceInCents: number): string {
    return (priceInCents / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  const availability = getAvailability(doctor);

  return (
    <Card className="max-w-[268px] w-full px-6 cursor-pointer shadow-none  hover:shadow-lg transition-shadow duration-200 h-full">
      <CardHeader className="px-0">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gray-200 text-gray-600">
                { doctorInitials }
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h3 className="text-sm font-medium">
              {doctor.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {doctor.specialty}
            </p>
          </div>
        </div>
      </CardHeader>
      <Separator/>
      <CardContent className="flex flex-col gap-3 px-0">
        <Badge className="bg-blue-50 text-blue-950">
          <CalendarDays className="h-4 w-4 inline-block" />
          <span className="capitalize">{ availability.from.format("ddd") }</span> a <span className="capitalize">{availability.to.format("ddd")}</span>
        </Badge>
        <Badge className="bg-blue-50 text-blue-950">
          <Clock className="h-4 w-4 inline-block" />
           Das {availability.from.format("HH:mm")} às {availability.to.format("HH:mm")}
        </Badge>
       <Badge className="bg-blue-50 text-blue-950">
          <DollarSign className="h-4 w-4 inline-block" />
          { formatCurrencyInCents(doctor.appointmentPriceInCents) }
        </Badge>

      </CardContent>
      <Separator className="w-full" />
      <CardFooter className="flex flex-col gap-2 justify-between items-center px-0">
        <DeleteDoctor doctor={doctor} />
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
              <Button className="w-full">
                Ver detalhes
              </Button>
            </DialogTrigger>
            <UpsertDoctorForm
              doctor={{
                ...doctor,
                availableToTime: availability.to.format("HH:mm:ss"),
                availableFromTime: availability.from.format("HH:mm:ss"),
              }}
              onSuccess={() => setIsOpen(false)}
              isOpen={isOpen}
            />
        </Dialog>
      </CardFooter>
    </Card>
  );
}
