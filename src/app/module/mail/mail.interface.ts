import { Types } from 'mongoose';
import { IUserName } from '../../interface/user';

export interface IMail {
  user: Types.ObjectId;
  phoneNumber: string;
  name: IUserName;
  email: string;
  isDeleted: boolean;
  description: string;
  subject: string;
}
