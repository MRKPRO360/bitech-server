export const customerSearchableFields = [
  'name.firstName',
  'name.lastName',
  'email',
  'phoneNumber',
  'address.city',
  'address.country',
  'address.zipCode',
];
export const CustomerStatus = ['in-progress', 'blocked'] as const;

export type TCustomerStatus = (typeof CustomerStatus)[number];
