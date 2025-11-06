import express, { NextFunction, Request, Response } from 'express';
import { USER_ROLE } from '../user/user.constant';

import { multerUpload } from '../../config/multer.config';

import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { AdminValidationSchema } from './admin.validation';
import { AdminControllers } from './admin.controller';

const router = express.Router();

router.route('/').patch(
  auth(USER_ROLE.admin, USER_ROLE.customer),
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(AdminValidationSchema.updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

export default router;
