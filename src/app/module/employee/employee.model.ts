import mongoose, { Schema } from 'mongoose';
import { IUserAddress, IUserName } from '../../interface/user';
import { EmployeeModel, IEmployee } from './employee.interface';
import {
  DEPARTMENTS,
  DESIGNATIONS,
  EMPLOYEE_STATUS,
  GENDER,
} from './employee.constant';
import { USER_ROLE } from '../user/user.constant';

const employeeNameSchema = new Schema<IUserName>(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
      trim: true,
      maxlength: [20, 'Name can not be more than 20 characters'],
    },

    lastName: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { _id: false },
);

const employeeAddressSchema = new Schema<IUserAddress>(
  {
    city: { type: String },
    zipCode: { type: String },
    country: { type: String },
  },
  { _id: false },
);

const EmployeeSchema = new Schema<IEmployee, EmployeeModel>(
  {
    name: {
      type: employeeNameSchema,
      required: true,
    },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },

    gender: {
      type: String,
      enum: {
        values: GENDER,
        message: '{VALUE} is not supported',
      },
    },
    role: {
      type: String,
      enum: {
        values: Object.values(USER_ROLE),
        message: '{VALUE} is not supported',
      },
      default: USER_ROLE.employee,
    },

    skills: [{ type: String }],
    joiningDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: {
        values: EMPLOYEE_STATUS,
      },
      default: EMPLOYEE_STATUS[0],
    },
    salary: {
      type: String,
    },
    department: {
      type: String,
      enum: DEPARTMENTS,
    },
    designation: {
      type: String,
      enum: {
        values: DESIGNATIONS,
        message: '{VALUE} is not supported',
      },
    },
    dateOfBirth: {
      type: Date,
    },

    address: {
      type: employeeAddressSchema,
    },
    profileImg: String,
  },
  {
    timestamps: true,
    virtuals: true,
  },
);

//virtual
EmployeeSchema.virtual('fullName').get(function () {
  return this?.name?.firstName + this?.name?.lastName;
});

// Query Middleware
EmployeeSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

EmployeeSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//creating a custom static method
EmployeeSchema.statics.isEmployeeExistsById = async function (id: string) {
  return await Employee.findById(id);
};

EmployeeSchema.statics.isEmployeeExistsByEmail = async function (
  email: string,
) {
  return await Employee.findOne({ email });
};

const Employee = mongoose.model<IEmployee, EmployeeModel>(
  'Employee',
  EmployeeSchema,
);

export default Employee;
