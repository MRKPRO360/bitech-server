/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import Employee from './employee.model';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { IEmployee } from './employee.interface';

import { USER_ROLE } from '../user/user.constant';
import createToken from '../auth/auth.utils';
import config from '../../config';
import QueryBuilder from '../../builder/QueryBuilder';
import { employeeSearchableFields } from './employee.constant';

const getAllEmployeesFromDB = async (query: Record<string, unknown>) => {
  const EmployeeQuery = new QueryBuilder(Employee.find(), query)
    .search(employeeSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await EmployeeQuery.countTotal();
  const result = await EmployeeQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleEmployeeFromDB = async (id: string) => {
  return await Employee.findById(id);
};

const deleteEmployeeFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedEmployee = await Employee.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedEmployee) {
      throw new AppError(400, 'Failed to delete Employee!');
    }

    const userId = deletedEmployee.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );

    if (!deletedUser) {
      throw new AppError(400, 'Failed to delete user!');
    }

    await session.commitTransaction();
    session.endSession();

    return deletedEmployee;
  } catch (err: any) {
    console.log(err);

    await session.abortTransaction();
    session.endSession();
    throw new Error('Failed to delete Employee!');
  }
};

const updateEmployeeInDB = async (payload: Partial<IEmployee>, file?: any) => {
  if (!payload._id) {
    throw new AppError(404, "Employee id isn't provided");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Fetch existing user & Employee
    const employee = await Employee.findById(payload._id).session(session);

    const user = await User.findOne({
      email: employee?.email,
      role: USER_ROLE.employee,
    }).session(session);

    if (!user || !employee) {
      throw new AppError(404, 'User or Employee not found');
    }

    // If a new image is uploaded, update profileImg for both User and Employee
    if (file?.path) {
      payload.profileImg = file.path || payload.profileImg;
    }

    const { _id, ...data } = payload;

    // Update User
    await User.findByIdAndUpdate(user._id, data, {
      session,
      new: true,
    });

    // Update Employee

    const updatedEmployee = await Employee.findByIdAndUpdate(
      employee._id,
      data,
      {
        session,
        new: true,
      },
    );

    await session.commitTransaction();
    await session.endSession();

    if (!updatedEmployee) throw new AppError(400, 'Employee update failed!');
    const jwtPayload = {
      email: updatedEmployee.email,
      role: USER_ROLE.employee,
      id: user._id,
      profileImg: updatedEmployee.profileImg,
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );

    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string,
    );

    return {
      accessToken,
      refreshToken,
    };
  } catch (err: any) {
    console.log(err);
    await session.abortTransaction();
    session.endSession();
    throw new Error(err);
  }
};

const changeEmployeeStatusInDB = async (payload: Partial<IEmployee>) => {
  const employee = await Employee.findById(payload._id);

  const user = await User.findOne({
    email: employee?.email,
    role: USER_ROLE.employee,
  });

  if (!user || !employee) {
    throw new AppError(404, 'User or Employee not found');
  }

  return await Employee.findByIdAndUpdate(employee._id, payload, {
    new: true,
  });
};

export const EmployeeServices = {
  getAllEmployeesFromDB,
  getSingleEmployeeFromDB,
  changeEmployeeStatusInDB,
  updateEmployeeInDB,
  deleteEmployeeFromDB,
};
