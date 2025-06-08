"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { doctorsTable, patientsTable } from "@/db/schema";
import { Plus } from "lucide-react";
import { useState } from "react";
import { UpsertAppointmentForm } from "./UpsertAppointmentForm";

interface AddAppointmentButtonProps {
  patients: (typeof patientsTable.$inferSelect)[];
  doctors: (typeof doctorsTable.$inferSelect)[];
}

export function AddAppointmentButton({ patients, doctors }: AddAppointmentButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Novo Agendamento
        </Button>
      </DialogTrigger>
      <UpsertAppointmentForm
        patients={patients}
        doctors={doctors}
        onSuccess={() => setIsOpen(false)} 
        isOpen={isOpen}
      />
    </Dialog>
  );
}
