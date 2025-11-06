// export const DEPARTMENTS = [
//   'Development',
//   'Design',
//   'Marketing',
//   'HR',
//   'Finance',
//   'Sales',
//   'Management',
//   'Support',
// ] as const;

// export const DESIGNATIONS = [
//   'Intern',
//   'Junior Developer',
//   'Mid Developer',
//   'Senior Developer',
//   'Team Lead',
//   'Project Manager',
//   'Designer',
//   'HR Manager',
//   'QA Engineer',
//   'Marketing Executive',
// ] as const;

// export const EMPLOYEE_STATUS = [
//   'Active',
//   'Inactive',
//   'On Leave',
//   'Resigned',
//   'Alumni',
// ] as const;

// export const GENDER = ['Male', 'Female', 'Other'] as const;

// export type TGender = (typeof GENDER)[number];

// export type TDepartment = (typeof DEPARTMENTS)[number];
// export type TDesignation = (typeof DESIGNATIONS)[number];
// export type TEmployeeStatus = (typeof EMPLOYEE_STATUS)[number];

// export const employeeSearchableFields = [
//   'name.firstName',
//   'name.lastName',
//   'email',
//   'phoneNumber',
//   'address.city',
//   'address.country',
//   'address.zipCode',
// ];

export const DEPARTMENTS = [
  'Advisory Board',
  'Leadership Team',
  'Operations',
  'Office Admin',
  'Sales & Marketing',
  'Development',
  'Design & Editing',
] as const;

export const DESIGNATIONS = [
  // Advisory Board
  'Advisory Board Member',

  // Leadership Team
  'Chairman',
  'Managing Director',
  'Chief Executive Officer',
  'Chief Technical Officer',
  'General Manager',

  // Operations Team
  'Chief Operation Officer',
  'Senior Operation Officer',
  'Operation Manager',
  'Operation Engineer',
  'Customer Relationship Officer',

  // Office Admin
  'HR & Admin',
  'Accounts & Finance',
  'Office Executive',

  // Sales & Marketing
  'Head of Sales',
  'Chief Marketing Officer',
  'Senior Marketing Executive',
  'Sales & Marketing Executive',

  // Developer Team
  'Software Engineer',
  'Senior Software Developer',
  'Junior Software Developer',
  'Flutter Developer',
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'QA Engineer',

  // Designer & Editor
  'Graphic Designer',
  'UI/UX Designer',
  'SEO & Digital Marketing Officer',
  'Video Editor',
  'Other',
] as const;

export const EMPLOYEE_STATUS = [
  'Active',
  'Inactive',
  'On Leave',
  'Resigned',
  'Alumni',
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
