import { z } from 'zod';

// Phone number regex - accepts various US phone formats
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

export const quoteFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, { message: "Please enter a valid phone number" })
    .or(z.string().length(0)), // Allow empty phone
  projectAreas: z
    .string()
    .min(1, { message: "Please select project area(s)" }),
  propertyType: z
    .string()
    .min(1, { message: "Please select property type" }),
  projectTimeline: z
    .string()
    .min(1, { message: "Please select your timeline" }),
  decisionStage: z
    .string()
    .min(1, { message: "Please select your decision stage" }),
  budgetRange: z
    .string()
    .min(1, { message: "Please select your budget range" }),
  message: z
    .string()
    .trim()
    .max(1000, { message: "Message must be less than 1000 characters" }),
});

export const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
});

export const exitPopupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  phone: z
    .string()
    .trim()
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, { message: "Please enter a valid phone number" })
    .or(z.string().length(0)),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;
export type EmailFormData = z.infer<typeof emailSchema>;
export type ExitPopupFormData = z.infer<typeof exitPopupSchema>;
