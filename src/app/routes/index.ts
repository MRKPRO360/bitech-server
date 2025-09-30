import { Router } from 'express';
import UserRouter from '../module/user/user.routes';
import CustomerRouter from '../module/customer/customer.routes';
import OrderRouter from '../module/order/order.routes';
const router = Router();
const moduleRoutes = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/customers',
    route: CustomerRouter,
  },
  {
    path: '/orders',
    route: OrderRouter,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
