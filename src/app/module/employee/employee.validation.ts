import { z } from 'zod';
import {
  DEPARTMENTS,
  DESIGNATIONS,
  EMPLOYEE_STATUS,
  GENDER,
} from './employee.constant';
import { USER_ROLE } from '../user/user.constant';

const createEmployeeNameValidationSchema = z.object({
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
const updateEmployeeNameValidationSchema = z.object({
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

const EmployeeAddressValidationSchema = z.object({
  country: z.string().optional(),
  city: z.string({ message: 'Invalid city' }).optional(),
  zipCode: z.string().optional(),
});

const createEmployeeValidatonSchema = z.object({
  body: z.object({
    name: createEmployeeNameValidationSchema,
    address: EmployeeAddressValidationSchema.optional(),
    email: z.string().email(),
    phoneNumber: z.string(),
    profileImg: z.string().optional(),

    gender: z.enum(GENDER).optional(),
    dateOfBirth: z.string().datetime().optional(),

    department: z.enum(DEPARTMENTS),
    designation: z.enum(DESIGNATIONS),
    salary: z.number().optional(),
    skills: z.array(z.string()).optional(),
    joiningDate: z.string().datetime().optional(),
    role: z.enum(USER_ROLE).default('employee'),
    status: z.enum(EMPLOYEE_STATUS).default('Active'),
  }),
});

const updateEmployeeValidatonSchema = z.object({
  body: z.object({
    name: updateEmployeeNameValidationSchema.optional(),
    address: EmployeeAddressValidationSchema.optional(),
    email: z.string().email().optional(),
    phoneNumber: z.string().min(11).max(15).optional(),
    profileImg: z.string().optional(),
    gender: z.enum(GENDER).optional(),
    dateOfBirth: z.string().datetime().optional(),

    department: z.enum(DEPARTMENTS).optional(),
    designation: z.enum(DESIGNATIONS).optional(),
    salary: z.number().optional(),
    skills: z.array(z.string()).optional(),
    joiningDate: z.string().datetime().optional(),
    role: z.enum(USER_ROLE).default('employee').optional(),
    status: z.enum(EMPLOYEE_STATUS).default('Active').optional(),
  }),
});

export const EmployeeValidationsSchema = {
  createEmployeeValidatonSchema,
  updateEmployeeValidatonSchema,
};
