import { z } from "zod";

export const upsertDoctorSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  specialty: z.string().min(1, "Especialidade é obrigatória"),
  appointmentPriceInCents: z.number().min(1, "Preço da consulta é obrigatório"),
  availableFromWeekDay: z.number().min(0).max(6),
  availableToWeekDay: z.number().min(0).max(6),
  availableFromTime: z.string().min(1, "Horário de início é obrigatório"),
  availableToTime: z.string().min(1, "Horário de término é obrigatório"),
}).refine((data) => {
  return data.availableFromWeekDay < data.availableToWeekDay;
}, {
  message: "O dia inicial deve ser anterior ao dia final",
  path: ["availableToWeekDay"],
}).refine((data) => {
  return data.availableFromTime < data.availableToTime
}, {
  message: "O horário inicial deve ser anterior ao horário final",
  path: ["availableToTime"],
})

export type UpsertDoctorSchema = z.infer<typeof upsertDoctorSchema>;