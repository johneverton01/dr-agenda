"use client";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { z } from "zod";

import { upsertDoctor } from "@/actions/upsert-doctor";
import { doctorsTable } from "@/db/schema";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { medicalSpecialties } from "../enums";
import { SelectTime } from "./SelectTime";
import { SelectWeekDay } from "./SelectWeekDay";

const formSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    specialty: z.string().min(1, "Especialidade é obrigatória"),
    appointmentPrice: z.number().min(1, "Preço da consulta é obrigatório"),
    availableFromWeekDay: z.string(),
    availableToWeekDay: z.string(),
    availableFromTime: z.string().min(1, "Horário de início é obrigatório"),
    availableToTime: z.string().min(1, "Horário de término é obrigatório"),
  })
  .refine(
    (data) => {
      return data.availableFromWeekDay < data.availableToWeekDay;
    },
    {
      message: "O dia inicial deve ser anterior ao dia final",
      path: ["availableToWeekDay"],
    }
  )
  .refine(
    (data) => {
      return data.availableFromTime < data.availableToTime;
    },
    {
      message: "O horário inicial deve ser anterior ao horário final",
      path: ["availableToTime"],
    }
  );

  interface UpsertDoctorFormProps {
    doctor?: typeof doctorsTable.$inferSelect;
    onSuccess: () => void;
  }

export function UpsertDoctorForm({ doctor, onSuccess }: UpsertDoctorFormProps) {
  console.log("UpsertDoctorForm", doctor);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: doctor?.name || "",
      specialty: doctor?.specialty || "",
      appointmentPrice: doctor?.appointmentPriceInCents ?  doctor?.appointmentPriceInCents / 100 : 0,
      availableFromWeekDay: doctor?.availableFromWeekDay.toString() || "1",
      availableToWeekDay: doctor?.availableToWeekDay.toString() || "5",
      availableFromTime: doctor?.availableFromTime || "",
      availableToTime: doctor?.availableToTime || "",
    },
  });

  const upsertDoctorAction = useAction(upsertDoctor, {
    onSuccess: () => {
      toast.success(doctor ? "Médico editado com sucesso!" : "Médico adicionado com sucesso!");
      onSuccess();
    },
    onError: () => {
      toast.error(doctor ? "Erro ao editar médico" : "Erro ao adicionar médico");
    },
  });

  function isLoading() {
    return upsertDoctorAction.isPending;
  }

  function handleSubmit(data: z.infer<typeof formSchema>) {
    upsertDoctorAction.execute({
      ...data,
      id: doctor?.id,
      availableFromWeekDay: parseInt(data.availableFromWeekDay),
      availableToWeekDay: parseInt(data.availableToWeekDay),
      appointmentPriceInCents: data.appointmentPrice * 100,
    });
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{doctor ? doctor.name : 'Adicionar um nobo médico'}</DialogTitle>
        <DialogDescription>
          {doctor ? "Edite as informações desse médico." : 'Adicione um novo médico à sua clínica'}
          
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Nome do médico"
                    className="input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="specialty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Especialidade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma especialidade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {medicalSpecialties.map((specialty) => (
                      <SelectItem key={specialty.value} value={specialty.value}>
                        {specialty.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="appointmentPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço da consulta</FormLabel>
                <NumericFormat
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value.floatValue);
                  }}
                  decimalScale={2}
                  fixedDecimalScale
                  decimalSeparator=","
                  allowNegative={false}
                  allowLeadingZeros={false}
                  thousandSeparator="."
                  customInput={Input}
                  prefix="R$"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="availableFromWeekDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dia inicial de disponibilidade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um dia" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectWeekDay />
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="availableToWeekDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dia final de disponibilidade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um dia" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectWeekDay />
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="availableFromTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horário inicial de disponibilidade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um horário" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectTime />
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="availableToTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horário final de disponibilidade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um horário" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectTime />
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit" className="w-full" disabled={isLoading()}>
              {isLoading() && <Loader2 className="h-4 w-4 animate-spin" />}
              {doctor ? "Atualizar Médico" : "Adicionar Médico"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
