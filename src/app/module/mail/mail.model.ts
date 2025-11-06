import { model, Schema } from 'mongoose';
import { IMail } from './mail.interface';
import { IUserName } from '../../interface/user';

const customerNameSchema = new Schema<IUserName>(
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

const mailSchema = new Schema<IMail>(
  {
    name: {
      type: customerNameSchema,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      // required: true,
      default: null,
    },

    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Mail = model<IMail>('Mail', mailSchema);

export default Mail;
