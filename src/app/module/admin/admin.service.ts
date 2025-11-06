/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { IAdmin } from './admin.interface';
import Admin from './admin.model';
import { User } from '../user/user.model';
import { USER_ROLE } from '../user/user.constant';
import createToken from '../auth/auth.utils';
import config from '../../config';

const updateAdminInDB = async (payload: Partial<IAdmin>, file?: any) => {
  if (!payload._id) {
    throw new AppError(404, "Admin id isn't provided");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Fetch existing user & admin
    const admin = await Admin.findById(payload._id).session(session);

    const user = await User.findOne({
      email: admin?.email,
      role: USER_ROLE.admin,
    }).session(session);

    if (!user || !admin) {
      throw new AppError(404, 'User or admin not found');
    }

    // If a new image is uploaded, update profileImg for both User and admin
    if (file?.path) {
      payload.profileImg = file.path || payload.profileImg;
    }

    const { _id, ...data } = payload;

    // Update User
    await User.findByIdAndUpdate(user._id, data, {
      session,
      new: true,
    });

    // Update admin

    const updatedadmin = await Admin.findByIdAndUpdate(admin._id, data, {
      session,
      new: true,
    });

    await session.commitTransaction();
    await session.endSession();

    if (!updatedadmin) throw new AppError(400, 'admin update failed!');
    const jwtPayload = {
      email: updatedadmin.email,
      role: USER_ROLE.admin,
      id: user._id,
      profileImg: updatedadmin.profileImg,
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

export const AdminServices = {
  updateAdminInDB,
};
