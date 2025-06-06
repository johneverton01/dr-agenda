"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { UpsertPatientsForm } from "./UpsertPatientsForm";

export function AddPatientsButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Adicionar Paciente
        </Button>
      </DialogTrigger>
      <UpsertPatientsForm onSuccess={() => setIsOpen(false)}/>
    </Dialog>
  );
}
