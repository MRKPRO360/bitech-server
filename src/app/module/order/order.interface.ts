import { Types, Document } from 'mongoose';

export type IStatus = 'Pending' | 'Completed' | 'Cancelled';

export interface IOrderService {
  service: Types.ObjectId;
}
export interface IOrder extends Document {
  user: Types.ObjectId;
  services: IOrderService[];
  price: number;
  paymentMethod: 'Cash' | 'Card' | 'Online';
  orderStatus: IStatus;
  paymentIntentId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  payment?: Types.ObjectId;
}
