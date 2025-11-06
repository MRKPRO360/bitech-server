import { z } from 'zod';
const customerNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  lastName: z.string().trim().optional(),
});

const createMailValidation = z.object({
  body: z.object({
    email: z
      .string({
        message: 'Email is required',
      })
      .email('Invalid email address'),
    name: customerNameValidationSchema,
    subject: z.string({
      message: 'Subject is required',
    }),
    phone: z.string({
      message: 'Phone is required',
    }),
    description: z
      .string({
        message: 'Description is required',
      })
      .min(1, 'Description is required'),
  }),
});

export const mailValidationSchema = {
  createMailValidation,
};
