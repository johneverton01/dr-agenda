import { deleteDoctor } from "@/actions/delete-doctor";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { doctorsTable } from "@/db/schema";
import { Trash } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

interface DeleteDoctorProps {
  doctor: typeof doctorsTable.$inferSelect,
}

export function DeleteDoctor({
  doctor,
}: DeleteDoctorProps) {
  const deleteDoctorAction = useAction(deleteDoctor, {
    onSuccess: () => {
      toast.success("Médico excluído com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao deletar médico");
    },
  })

  function handleDeleteDoctor() {
    if (!doctor.id) return;
    deleteDoctorAction.execute({ id: doctor.id });
  }
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Trash className="h-4 w-4" />
          Excluir
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir o Médico?</AlertDialogTitle>
          <AlertDialogDescription>
            {`Essa ação não pode ser revertida. Isso irá deletar o médico ${doctor.name} e
                todas as consultas agendadas.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteDoctor}>
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
