import { z } from 'zod';

const createCustomerNameValidationSchema = z.object({
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
const updateCustomerNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    })
    .optional(),
  lastName: z.string().trim().optional(),
});

const customerAddressValidationSchema = z.object({
  country: z.string().optional(),
  city: z.string({ message: 'Invalid city' }).optional(),
  zipCode: z.string().optional(),
});

const createCustomerValidatonSchema = z.object({
  body: z.object({
    name: createCustomerNameValidationSchema,
    address: customerAddressValidationSchema.optional(),
    email: z.string().email(),
    phoneNumber: z.string().optional(),
    profileImg: z.string().optional(),
    orders: z
      .array(
        z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
          message: 'Invalid ObjectId format',
        }),
      )
      .optional(),
  }),
});

const updateCustomerValidatonSchema = z.object({
  body: z.object({
    name: updateCustomerNameValidationSchema.optional(),
    address: customerAddressValidationSchema.optional(),
    email: z.string().email().optional(),
    phoneNumber: z.string().min(11).max(15).optional(),
    profileImg: z.string().optional(),
    orders: z
      .array(
        z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
          message: 'Invalid ObjectId format',
        }),
      )
      .optional(),
  }),
});

export const customerValidationsSchema = {
  createCustomerValidatonSchema,
  updateCustomerValidatonSchema,
};
