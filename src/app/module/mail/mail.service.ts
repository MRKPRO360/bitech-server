import { JwtPayload } from 'jsonwebtoken';
import { IMail } from './mail.interface';
import Mail from './mail.model';
import { sendEmail } from '../../utils/sendEmail';
import config from '../../config';
import { generateMailHTML } from '../../config/generateMailHTML';

const createMailInDB = async (payload: IMail) => {
  await sendEmail(
    config.sender_email as string,
    generateMailHTML(payload),
    payload.email,
    payload.subject,
    payload.description,
  );

  return await Mail.create(payload);
};
const getAllMailsFromDB = async () => {
  return await Mail.find({ isDeleted: { $ne: true } });
};

const getMyMailsFromDB = async (authUser: JwtPayload) => {
  return await Mail.find({ user: authUser.id, isDeleted: { $ne: true } });
};

const deleteAMailFromDB = async (id: string) => {
  return await Mail.findByIdAndUpdate(id, { isDeleted: true });
};

export const mailServices = {
  createMailInDB,
  getAllMailsFromDB,
  deleteAMailFromDB,
  getMyMailsFromDB,
};
