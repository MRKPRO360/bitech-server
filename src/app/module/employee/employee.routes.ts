import express, { NextFunction, Request, Response } from 'express';
import { USER_ROLE } from '../user/user.constant';
import { EmployeeControllers } from './employee.controller';
import { multerUpload } from '../../config/multer.config';
import { EmployeeValidationsSchema } from './employee.validation';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router
  .route('/')
  .get(
    // auth(USER_ROLE.admin),
    EmployeeControllers.getAllEmployees,
  )
  .patch(
    auth(USER_ROLE.admin, USER_ROLE.employee),
    multerUpload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      next();
    },
    validateRequest(EmployeeValidationsSchema.updateEmployeeValidatonSchema),
    EmployeeControllers.updateEmployee,
  );

router
  .route('/change-status')
  .patch(auth(USER_ROLE.admin), EmployeeControllers.changeEmployeeStatus);

router
  .route('/:id')
  .get(EmployeeControllers.getSingleEmployee)
  .delete(auth(USER_ROLE.admin), EmployeeControllers.deleteEmployee);

export default router;
