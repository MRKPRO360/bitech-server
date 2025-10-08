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
import PrebuiltProject from '../prebuilt-project/prebuiltProject.model';
import { generateTransactionId } from '../payment/payment.utils';
import { sslService } from '../sslcommerz/sslcommerz.service';
import Customer from '../customer/customer.model';

const stripe = new Stripe(config.stripe_sk_test as string);

const createOrder = async (
  orderData: Partial<IOrder>,
  authUser: JwtPayload,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  let totalAmount = 0;

  try {
    // if (orderData.services) {
    // const servicePrice =
    // }

    if (orderData.projects && orderData.projects.length) {
      for (const projectItem of orderData.projects) {
        const project = await PrebuiltProject.findById(projectItem.project);

        if (project) {
          if (project?.isDeleted) {
            throw new AppError(400, 'Project is deleted.');
          }
        } else {
          throw new AppError(404, 'Project is not found');
        }

        totalAmount += Number(project.price);
      }
    }

    // if (orderData.services && orderData.services.length > 0) {
    //   for (const serviceItem of orderData.services) {
    //     const service = await Service.findById(serviceItem.service);
    //     if (service) totalAmount += Number(service.price);
    //   }
    // }

    // Create the order
    const order = new Order({
      ...orderData,
      user: authUser.id,
    });

    const createdOrder = await order.save({ session });

    await createdOrder.populate('user projects.project');

    const transactionId = generateTransactionId();

    const payment = new Payment({
      user: authUser.id,
      order: createdOrder._id,
      method: orderData.paymentMethod,
      transactionId,
      amount: totalAmount,
    });

    await payment.save({ session });

    let result;

    const customer = await Customer.isCustomerExistsByEmail(authUser.email);

    if (createdOrder.paymentMethod === 'Online') {
      result = await sslService.initPayment({
        total_amount: createdOrder.amount,
        tran_id: transactionId,
        cus_name: customer?.name.firstName + ' ' + customer?.name.lastName,
        cus_email: customer?.email,
        cus_city: customer?.address?.city,
        cus_postcode: customer?.address?.zipCode,
        cus_country: customer?.address?.country,
        cus_phone: customer?.phoneNumber,
      });
      result = { paymentUrl: result };
    } else {
      result = order;
    }

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

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

const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(
    Order.find().populate('user services.service projects.project'),
    query,
  )
    .search(['user.name', 'user.email', 'products.product.name'])
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

const getOrderDetailsFromDB = async (orderId: string) => {
  const order = await Order.findById(orderId).populate(
    'user services.service projects.project',
  );
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
    Order.find({ user: authUser.id }).populate(
      'user services.service projects.project',
    ),
    query,
  )
    .search([
      'user.name',
      'user.email',
      'services.service.name',
      'projects.project.title',
    ])
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

  const order = await Order.findById(orderId);

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
