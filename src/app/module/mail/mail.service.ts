import { IMail } from './mail.interface';
import Mail from './mail.model';

const createMailInDB = async (payload: IMail) => {
  return await Mail.create(payload);
};
const getAllMailsFromDB = async () => {
  return await Mail.find();
};

export const mailServices = {
  createMailInDB,
  getAllMailsFromDB,
};
