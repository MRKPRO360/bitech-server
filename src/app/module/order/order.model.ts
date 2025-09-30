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
          required: true,
        },

        status: {
          type: String,
          enum: ['Pending', 'Completed', 'Cancelled'],
          default: 'Pending',
        },
      },
    ],

    price: {
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
    payment: {
      type: Schema.Types.ObjectId,
      ref: 'Payment',
    },
  },
  {
    timestamps: true,
  },
);

export const Order = model<IOrder>('Order', orderSchema);
