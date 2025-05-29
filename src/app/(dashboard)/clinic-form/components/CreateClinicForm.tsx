"use client";
import { createClinic } from "@/actions/create-clinic";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const clinicFormSchema = z.object({
  name: z.string().trim().min(1, "Nome da clínica é obrigatório"),
});

export function CreateClinicForm() {
  const form = useForm<z.infer<typeof clinicFormSchema>>({
    resolver: zodResolver(clinicFormSchema),
    defaultValues: {
      name: "",
    },
    resetOptions: {
      keepDefaultValues: true,
    },
  });

  function isLoading() {
    return form.formState.isSubmitting;
  }

  async function onSubmit(data: z.infer<typeof clinicFormSchema>) {
    try {
      await createClinic(data.name)
    } catch (error) {
      if (isRedirectError(error)) {
        return
      }
      console.error(error);
      toast.error("Erro ao criar clínica", {
        description: "Ocorreu um erro ao tentar criar a clínica. Por favor, tente novamente.",
      });
    }
  }
  return (
    <Form {...form}>
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da Clínica: </FormLabel>
                <FormControl>
                  <Input placeholder="Informe o nome da clínica" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button
              type="submit"
              disabled={isLoading()}
            >
              { isLoading()
                && 
                <Loader2 className="h-4 w-4 animate-spin" />
              }
              Criar Clínica
            </Button>
          </DialogFooter>
        </form>
      </Form>
  );
}
