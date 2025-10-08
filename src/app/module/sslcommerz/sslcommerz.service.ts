import SSLCommerzPayment from 'sslcommerz-lts';
import config from '../../config';
import { Payment } from '../payment/payment.model';
import { Order } from '../order/order.model';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';

const store_id = config.store_id as string;
const store_passwd = config.store_password as string;
const is_live = false; // true for live, false for sandbox

// SSLCommerz init
const initPayment = async (paymentData: {
  total_amount: number;
  tran_id: string;
  cus_name: string | undefined;
  cus_email: string | undefined;
  cus_city: string | undefined;
  cus_postcode: string | undefined;
  cus_country: string | undefined;
  cus_phone: string | undefined;
}) => {
  const {
    total_amount,
    tran_id,
    cus_name,
    cus_email,
    cus_city,
    cus_postcode,
    cus_country,
    cus_phone,
  } = paymentData;

  const data = {
    total_amount,
    currency: 'BDT',
    tran_id, // Use unique tran_id for each API call
    success_url: `${config.validation_url}?tran_id=${tran_id}`,
    fail_url: config.failed_url as string,
    cancel_url: config.cancel_url as string,
    ipn_url: 'https://bttech-beta.vercel.app/api/v1/ssl/ipn',
    cus_name,
    cus_email,
    cus_city,
    cus_postcode,
    cus_country,
    cus_phone,
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

  try {
    const apiResponse = await sslcz.init(data);

    // Redirect the user to the payment gateway
    const GatewayPageURL = apiResponse.GatewayPageURL;

    if (GatewayPageURL) {
      return GatewayPageURL;
    } else {
      throw new AppError(400, 'Failed to generate payment gateway URL.');
    }
  } catch (error: any) {
    throw new AppError(
      403,
      error.message || 'An error occurred while processing payment.',
    );
  }
};

const validatePaymentService = async (tran_id: string): Promise<boolean> => {
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    //@ts-expect-error we'll prevent type error
    const validationResponse = await sslcz.transactionQueryByTransactionId({
      tran_id,
    });

    console.log(validationResponse.element);

    let data;

    if (
      validationResponse.element[0].status === 'VALID' ||
      validationResponse.element[0].status === 'VALIDATED'
    ) {
      data = {
        status: 'Paid',
        gatewayResponse: validationResponse.element[0],
      };
    } else if (validationResponse.element[0].status === 'INVALID_TRANSACTION') {
      data = {
        status: 'Failed',
        gatewayResponse: validationResponse.element[0],
      };
    } else {
      data = {
        status: 'Failed',
        gatewayResponse: validationResponse.element[0],
      };
    }

    const updatedPayment = await Payment.findOneAndUpdate(
      { transactionId: validationResponse.element[0].tran_id },
      data,
      { new: true, session },
    );

    if (!updatedPayment) {
      throw new Error('Payment not updated');
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      updatedPayment?.order,
      {
        paymentStatus: data.status,
      },
      { new: true, session },
    ).populate('user products.product');

    if (!updatedOrder) {
      throw new Error('Order not updated');
    }

    if (data.status === 'Failed') {
      throw new Error('Payment failed');
    }

    // Commit transaction only if no errors occurred
    await session.commitTransaction();
    session.endSession();

    console.log('email');

    return true;
  } catch (error) {
    console.error('Transaction Error:', error);

    // Only abort if it hasn't been committed yet
    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    // throw new Error('Transaction Failed');

    return false;
  }
};

export const sslService = {
  initPayment,
  validatePaymentService,
};
