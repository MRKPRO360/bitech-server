import { Document, Model, Types } from 'mongoose';
import { TMethod } from '../user/user.constant';
import { IUserAddress, IUserName } from '../../interface/user';
import { TCustomerStatus } from './customer.constant';

export interface ICustomer extends Document {
  name: IUserName;
  email: string;
  phoneNumber: string;
  user: Types.ObjectId;

  orders?: Types.ObjectId[];
  status: TCustomerStatus;
  profileImg?: string;
  address?: IUserAddress;
  method?: TMethod;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CustomerModel extends Model<ICustomer> {
  isCustomerExistsById(id: string): Promise<ICustomer | null>;
}

export interface CustomerModel extends Model<ICustomer> {
  isCustomerExistsByEmail(email: string): Promise<ICustomer | null>;
}
