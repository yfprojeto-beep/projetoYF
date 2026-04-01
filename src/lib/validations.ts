import { z } from "zod"

// Auth schemas
export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const RegisterSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Name is required"),
})

// Process schemas
export const ProcessSchema = z.object({
  processNumber: z.string(),
  statusId: z.string(),
  insured: z.string(),
  insurer: z.string(),
  broker: z.string().optional(),
  merchandise: z.string().optional(),
  value: z.number().optional(),
  prejudice: z.number().optional(),
  userId: z.string().optional(),
})

export const ProcessDetailSchema = z.object({
  preliminaryReport: z.string().optional(),
  eventDetails: z.string().optional(),
  analysis: z.string().optional(),
})

// Vistoria schema
export const VistoriaSchema = z.object({
  date: z.date().optional(),
  location: z.string().optional(),
  findings: z.string().optional(),
  status: z.string().default("AGENDADO"),
  inspectorName: z.string().optional(),
  justification: z.string().optional(),
})

// Salvado schema
export const SalvadoSchema = z.object({
  lotNumber: z.string(),
  storageLocation: z.string().optional(),
  status: z.string().default("RECEBIDO"),
  merchandise: z.string().optional(),
  quantity: z.string().optional(),
  damageDesc: z.string().optional(),
  sender: z.string().optional(),
  receiver: z.string().optional(),
})

// Adiantamento schema
export const AdiantamentoSchema = z.object({
  value: z.number(),
  reason: z.string().optional(),
  status: z.string().default("PENDENTE"),
})

// Financial schema
export const FinancialTransactionSchema = z.object({
  type: z.enum(["RECEITA", "DESPESA"]),
  amount: z.number(),
  description: z.string(),
  status: z.string().default("PENDENTE"),
  dueDate: z.date(),
  paidDate: z.date().optional(),
  referenceId: z.string().optional(),
  referenceType: z.string().optional(),
})

// Types
export type LoginInput = z.infer<typeof LoginSchema>
export type RegisterInput = z.infer<typeof RegisterSchema>
export type ProcessInput = z.infer<typeof ProcessSchema>
export type ProcessDetailInput = z.infer<typeof ProcessDetailSchema>
export type VistoriaInput = z.infer<typeof VistoriaSchema>
export type SalvadoInput = z.infer<typeof SalvadoSchema>
export type AdiantamentoInput = z.infer<typeof AdiantamentoSchema>
export type FinancialTransactionInput = z.infer<typeof FinancialTransactionSchema>
