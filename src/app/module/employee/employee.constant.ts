export const DEPARTMENTS = [
  'Development',
  'Design',
  'Marketing',
  'HR',
  'Finance',
  'Sales',
  'Management',
  'Support',
] as const;

export const DESIGNATIONS = [
  'Intern',
  'Junior Developer',
  'Mid Developer',
  'Senior Developer',
  'Team Lead',
  'Project Manager',
  'Designer',
  'HR Manager',
  'QA Engineer',
  'Marketing Executive',
  'Admin',
] as const;

export const EMPLOYEE_STATUS = [
  'Active',
  'Inactive',
  'On Leave',
  'Resigned',
] as const;

export const GENDER = ['Male', 'Female', 'Other'] as const;

export type TGender = (typeof GENDER)[number];

export type TDepartment = (typeof DEPARTMENTS)[number];
export type TDesignation = (typeof DESIGNATIONS)[number];
export type TEmployeeStatus = (typeof EMPLOYEE_STATUS)[number];

export const employeeSearchableFields = [
  'name.firstName',
  'name.lastName',
  'email',
  'phoneNumber',
  'address.city',
  'address.country',
  'address.zipCode',
];
