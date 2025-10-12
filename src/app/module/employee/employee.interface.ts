import { Document, Model, Types } from 'mongoose';
import { TMethod, TUserRole } from '../user/user.constant';
import { IUserAddress, IUserName } from '../../interface/user';
import {
  TDepartment,
  TDesignation,
  TEmployeeStatus,
  TGender,
} from './employee.constant';

export interface IEmployee extends Document {
  name: IUserName;
  email: string;
  phoneNumber: string;
  user: Types.ObjectId;

  profileImg?: string;
  gender?: TGender;
  address?: IUserAddress;
  dateOfBirth?: Date;
  method?: TMethod;
  isDeleted?: boolean;
  department: TDepartment;
  designation: TDesignation;
  salary?: string;
  skills: string[];
  joiningDate: Date;
  role: TUserRole;
  status: TEmployeeStatus;
  createdBy?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EmployeeModel extends Model<IEmployee> {
  isEmployeeExistsById(id: string): Promise<IEmployee | null>;
}

export interface EmployeeModel extends Model<IEmployee> {
  isEmployeeExistsByEmail(email: string): Promise<IEmployee | null>;
}
