"use client";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { z } from "zod";

import { medicalSpecialties } from "../enums";
import { SelectTime } from "./SelectTime";
import { SelectWeekDay } from "./SelectWeekDay";

const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  specialty: z.string().min(1, "Especialidade é obrigatória"),
  appointmentPrice: z.number().min(1, "Preço da consulta é obrigatório"),
  availableFromWeekDay: z.string(),
  availableToWeekDay: z.string(),
  availableFromTime: z.string().min(1, "Horário de início é obrigatório"),
  availableToTime: z.string().min(1, "Horário de término é obrigatório"),
}).refine((data) => {
  return data.availableFromWeekDay < data.availableToWeekDay
  
}, {
  message: "O dia inicial deve ser anterior ao dia final",
  path: ["availableToWeekDay"],
}).refine((data) => {
  return data.availableFromTime < data.availableToTime
}, {
  message: "O horário inicial deve ser anterior ao horário final",
  path: ["availableToTime"],
});

export function UpsertDoctorForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      specialty: "",
      appointmentPrice: 0,
      availableFromWeekDay: "1",
      availableToWeekDay: "5",
      availableFromTime: "",
      availableToTime: "",
    },
  });
  function handleSubmit(data: z.infer<typeof formSchema>) {
    console.log("Form submitted with data:", data);
    // Here you would typically handle the form submission, e.g., send data to an API
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Adicionar Médico</DialogTitle>
        <DialogDescription>
          Adicione um novo médico à sua clínica
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
            <Button type="submit" className="w-full">
              Adicionar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
