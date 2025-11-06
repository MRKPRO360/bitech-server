import { Router } from 'express';
import UserRouter from '../module/user/user.routes';
import CustomerRouter from '../module/customer/customer.routes';
import OrderRouter from '../module/order/order.routes';
import ProjectRouter from '../module/project/project.route';
import PrebuiltProjectRouter from '../module/prebuilt-project/prebuiltProject.route';
import AuthRouter from '../module/auth/auth.routes';
import SSLRouter from '../module/sslcommerz/sslcommerz.routes';
import EmployeeRouter from '../module/employee/employee.routes';
import AdminRouter from '../module/admin/admin.routes';
import MailRouter from '../module/mail/mail.routes';

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
    path: '/mails',
    route: MailRouter,
  },
  {
    path: '/admins',
    route: AdminRouter,
  },
  {
    path: '/employees',
    route: EmployeeRouter,
  },
  {
    path: '/orders',
    route: OrderRouter,
  },
  {
    path: '/projects',
    route: ProjectRouter,
  },
  {
    path: '/prebuilt-projects',
    route: PrebuiltProjectRouter,
  },
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/ssl',
    route: SSLRouter,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
