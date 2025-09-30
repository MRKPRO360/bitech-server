import { Router } from 'express';
import UserRouter from '../module/user/user.routes';
import CustomerRouter from '../module/customer/customer.routes';
import OrderRouter from '../module/order/order.routes';
import ProjectRouter from '../module/project/project.route';
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
  {
    path: '/projects',
    route: ProjectRouter,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
