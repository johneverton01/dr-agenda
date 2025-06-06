"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { patientsTable } from "@/db/schema";
import { EditIcon } from "lucide-react";
import { useState } from "react";
import { UpsertPatientsForm } from "./UpsertPatientsForm";

interface EditPatientButtonProps {
  patient: typeof patientsTable.$inferSelect;
}

export function EditPatientButton({ patient }: EditPatientButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
   <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <EditIcon /> Editar
        </Button>
      </DialogTrigger>
      <UpsertPatientsForm patient={patient} onSuccess={() => setIsOpen(false)}/>
    </Dialog>
  );
}
