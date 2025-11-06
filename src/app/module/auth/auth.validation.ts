import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ message: 'Refresh token is required!' }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z
      .string({ message: 'Old password is required!' })
      .min(6, 'Password must be at least 6 characters long'),
    newPassword: z
      .string({ message: 'New password is required!' })
      .min(6, 'Password must be at least 6 characters long'),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({ message: 'Id is required' }),
    newPassword: z
      .string({
        message: 'New password is required',
      })
      .min(6, 'Password must be at least 6 characters long'),
  }),
});

export const authValidations = {
  loginValidationSchema,
  refreshTokenValidationSchema,
  changePasswordValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
};
