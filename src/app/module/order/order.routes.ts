import { Router } from 'express';

import { OrderController } from './order.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middleware/auth';

const router = Router();

router
  .route('/')
  .post(auth(USER_ROLE.customer), OrderController.createOrder)
  .get(
    auth(USER_ROLE.admin, USER_ROLE.superAdmin),
    OrderController.getAllOrders,
  );

router.post('/create-payment-intent', OrderController.createPaymentIntent);

router.get('/my-orders', auth(USER_ROLE.customer), OrderController.getMyOrders);

router.get(
  '/services',
  auth(USER_ROLE.admin),
  OrderController.getAllServiceOrders,
);
router.get(
  '/projects',
  auth(USER_ROLE.admin),
  OrderController.getAllProjectOrders,
);

router.get(
  '/my-service-orders',
  auth(USER_ROLE.customer),
  OrderController.getMyServiceOrders,
);
router.get(
  '/my-project-orders',
  auth(USER_ROLE.customer),
  OrderController.getMyProjectOrders,
);

router.get(
  '/change-status',
  auth(USER_ROLE.admin),
  OrderController.updateOrderStatusByAdmin,
);

router
  .route('/:orderId')
  .get(auth(USER_ROLE.customer), OrderController.getOrderDetails)
  .patch(auth(USER_ROLE.admin), OrderController.updateOrderStatusByAdmin);

export default router;
