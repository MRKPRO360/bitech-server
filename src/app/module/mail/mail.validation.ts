import { z } from 'zod';

const createMailValidation = z.object({
  body: z.object({
    email: z
      .string({
        message: 'Email is required',
      })
      .email('Invalid email address'),
    name: z
      .string({
        message: 'Name is required',
      })
      .min(1, 'Name is required'),
    message: z
      .string({
        message: 'Message is required',
      })
      .min(1, 'Message is required'),
  }),
});

export const mailValidationSchema = {
  createMailValidation,
};
