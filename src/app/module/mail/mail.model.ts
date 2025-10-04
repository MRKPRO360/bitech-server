import { model, Schema } from 'mongoose';
import { IMail } from './mail.interface';

const mailSchema = new Schema<IMail>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Mail = model<IMail>('Mail', mailSchema);

export default Mail;
