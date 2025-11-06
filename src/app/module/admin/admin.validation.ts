import { z } from 'zod';

export const createAdminNameSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .max(20, 'Name cannot be more than 20 characters'),
  lastName: z
    .string()
    .trim()
    .min(1, 'Last name is required')
    .max(20, 'Name cannot be more than 20 characters'),
});

export const createAdminAddressSchema = z.object({
  city: z.string().trim().min(3, 'City is required'),
  country: z.string({ message: 'Invalid country' }),
  zipCode: z
    .string()
    .trim()
    .min(3, 'Zip code is required')
    .max(20, 'Zip code is too long'),
});

export const createAdminValidationSchema = z.object({
  body: z.object({
    name: createAdminNameSchema,
    address: createAdminAddressSchema,
    email: z.string().email('Invalid email address'),
    phoneNumber: z
      .string()
      .trim()
      .min(10, 'Phone number must be at least 10 digits'),
    profileImg: z.string().url('Invalid URL').optional(),
  }),
});

export const updateAdminValidationSchema = z.object({
  body: z.object({
    name: createAdminNameSchema.optional(),
    address: createAdminAddressSchema.optional(),
    email: z.string().email('Invalid email address').optional(),
    phoneNumber: z
      .string()
      .trim()
      .min(10, 'Phone number must be at least 10 digits')
      .optional(),
    profileImg: z.string().url('Invalid URL').optional(),
  }),
});

export const AdminValidationSchema = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
