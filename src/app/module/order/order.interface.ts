import { Types, Document } from 'mongoose';
import { IPrebuiltProject } from '../prebuilt-project/prebuiltProject.interface';

export type IStatus = 'Pending' | 'Completed' | 'Cancelled';

export interface IOrderService {
  service: Types.ObjectId;
}

export interface IOrderProjects {
  _id: Types.ObjectId;
  project: IPrebuiltProject;
}

export interface IOrder extends Document {
  user: Types.ObjectId;
  services: IOrderService[];
  projects: IOrderProjects[];
  amount: number;
  paymentMethod: 'Cash' | 'Card' | 'Online';
  orderStatus: IStatus;
  paymentIntentId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  payment?: Types.ObjectId;
}
