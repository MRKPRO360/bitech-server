import { Schema, model } from 'mongoose';
import { IOrder } from './order.interface';

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    services: [
      {
        service: {
          type: Schema.Types.ObjectId,
          ref: 'Service',
        },
      },
    ],
    projects: [
      {
        project: {
          type: Schema.Types.ObjectId,
          ref: 'PrebuiltProject',
        },
      },
    ],

    payment: {
      type: Schema.Types.ObjectId,
      ref: 'Payment',
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentMethod: {
      type: String,
      enum: ['COD', 'Online', 'Card'],
      default: 'Online',
    },
    orderStatus: {
      type: String,
      enum: ['Pending', 'Completed', 'Canecelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  },
);

export const Order = model<IOrder>('Order', orderSchema);
