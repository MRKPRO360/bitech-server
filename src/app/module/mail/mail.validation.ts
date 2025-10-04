import { z } from 'zod';

const createMailValidation = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email address'),
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(1, 'Name is required'),
    message: z
      .string({
        required_error: 'Message is required',
      })
      .min(1, 'Message is required'),
  }),
});

export const mailValidationSchema = {
  createMailValidation,
};
