import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { OrderService } from './order.service';
import sendResponse from '../../utils/sendResponse';
import { JwtPayload } from 'jsonwebtoken';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.createOrder(
    req.body,
    req.user as JwtPayload,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Order created succesfully',
    data: result,
  });
});

const createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
  const { price } = req.body;
  const result = await OrderService.createPaymentIntent(price);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Payment intent initialized succesfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrdersFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Orders retrived succesfully',
    data: result,
  });
});

const getAllProjectOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllProjectOrdersFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Orders retrived succesfully',
    data: result,
  });
});

const getAllServiceOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllServiceOrdersFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Orders retrived succesfully',
    data: result,
  });
});

const getOrderDetails = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getOrderDetailsFromDB(req.params.orderId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order retrive succesfully',
    data: result,
  });
});

const getMyOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getMyOrdersFromDB(
    req.query,
    req.user as JwtPayload,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order retrive succesfully',
    data: result,
  });
});

const getMyProjectOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getMyProjectOrdersFromDB(
    req.query,
    req.user as JwtPayload,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Project order retrieved succesfully',
    data: result,
  });
});

const getMyServiceOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getMyServiceOrdersFromDB(
    req.query,
    req.user as JwtPayload,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service order retrieved succesfully',
    data: result,
  });
});

const updateOrderStatusByAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const { status } = req.body;
    const result = await OrderService.updateOrderStatusByAdminFromDB(
      orderId,
      req.user as JwtPayload,
      status,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Order status updated succesfully',
      data: result,
    });
  },
);

// const changeOrderStatus = catchAsync(async (req: Request, res: Response) => {
//   const { status } = req.body;
//   const result = await OrderService.changeOrderStatus(
//     req.params.orderId,
//     status,
//     req.user as IJwtPayload,
//   );

//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: 'Order status changed succesfully',
//     data: result,
//   });
// });

export const OrderController = {
  createPaymentIntent,
  createOrder,
  getAllOrders,
  getOrderDetails,
  getMyOrders,
  getMyProjectOrders,
  getMyServiceOrders,
  getAllServiceOrders,
  getAllProjectOrders,
  updateOrderStatusByAdmin,
};
