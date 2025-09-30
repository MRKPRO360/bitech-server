import mongoose from 'mongoose';
import { IOrder, IStatus } from './order.interface';
import { Order } from './order.model';
import { Payment } from '../payment/payment.model';

import { JwtPayload } from 'jsonwebtoken';

import Stripe from 'stripe';
import config from '../../config';
import AppError from '../../errors/AppError';
import Admin from '../admin/admin.model';
import QueryBuilder from '../../builder/QueryBuilder';

const stripe = new Stripe(config.stripe_sk_test as string);

const createOrder = async (
  orderData: Partial<IOrder>,
  authUser: JwtPayload,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // if (orderData.services) {
    // const servicePrice =
    // }

    // Create the order
    const order = new Order({
      ...orderData,
      user: authUser.id,
    });

    const createdOrder = await order.save({ session });
    await createdOrder.populate('user meals.meal');

    let result;

    if (createdOrder.paymentMethod == 'Card') {
      const payment = new Payment({
        user: authUser.id,
        order: createdOrder._id,
        method: orderData.paymentMethod,
        paymentIntentId: orderData.paymentIntentId,
        price: createdOrder.price,
        status: 'Paid',
      });

      result = await payment.save({ session });
    }

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // const pdfBuffer = await generateOrderInvoicePDF(createdOrder);

    // const emailContent = await EmailHelper.createEmailContent(
    //   {
    //     userName: (createdOrder.user as unknown as IUser).name.firstName || '',
    //   },
    //   'orderInvoice',
    // );

    // const attachment = {
    //   filename: `Invoice_${createdOrder._id}.pdf`,
    //   content: pdfBuffer,
    //   encoding: 'base64', // if necessary
    // };

    // if (emailContent) {
    //   await EmailHelper.sendEmail(
    //     (createdOrder.user as unknown as IUser).email,
    //     emailContent,
    //     'Order confirmed!',
    //     attachment,
    //   );
    // }

    return result;
  } catch (error) {
    console.log(error);
    // Rollback the transaction in case of error
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

// stripe payment-intent
const createPaymentIntent = async (price: string) => {
  if (!price) return;
  const amount = Number(price) * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    currency: 'usd',
    amount: amount,
    payment_method_types: ['card'],
  });

  return paymentIntent.client_secret;
};

const getAllOrdersFromDB = async () => {
  return await Order.find({});
};

const getOrderDetailsFromDB = async (orderId: string) => {
  const order = await Order.findById(orderId).populate('user services');
  if (!order) {
    throw new AppError(404, 'Order not Found');
  }

  return order;
};

const getMyOrdersFromDB = async (
  query: Record<string, unknown>,
  authUser: JwtPayload,
) => {
  const orderQuery = new QueryBuilder(
    Order.find({ user: authUser.id }).populate('user meals.meal'),
    query,
  )
    .search(['user.name', 'user.email', 'meals.meal.recipeName'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await orderQuery.modelQuery;

  const meta = await orderQuery.countTotal();

  return {
    meta,
    result,
  };
};

const updateOrderStatusByAdminFromDB = async (
  orderId: string,
  authUser: JwtPayload,
  newStatus: IStatus,
) => {
  const admin = await Admin.findOne({
    user: authUser.id,
  }).select('_id');

  if (!admin) throw new AppError(400, 'No provider found!');

  const order = await Order.findById(orderId).populate('services');

  if (!order) {
    throw new AppError(400, 'Order not found');
  }

  order.orderStatus = newStatus;

  return await order.save();
};

export const OrderService = {
  createOrder,
  createPaymentIntent,
  getOrderDetailsFromDB,
  getAllOrdersFromDB,
  updateOrderStatusByAdminFromDB,
  getMyOrdersFromDB,
};
