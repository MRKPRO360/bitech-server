import express from 'express';
import { authValidations } from './auth.validation';
import { AuthControllers } from './auth.controller';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/auth';

const router = express.Router();

router
  .route('/login')
  .post(
    validateRequest(authValidations.loginValidationSchema),
    AuthControllers.loginUser,
  );

router.post(
  '/refresh-token',
  validateRequest(authValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

router.post(
  '/change-password',
  auth(USER_ROLE.customer, USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(authValidations.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

router.post(
  '/forgot-password',
  validateRequest(authValidations.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword,
);

router.post(
  '/reset-password',
  validateRequest(authValidations.resetPasswordValidationSchema),
  AuthControllers.resetPassword,
);

export default router;
