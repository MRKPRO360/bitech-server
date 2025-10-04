import express from 'express';

import { mailControllers } from './mail.controller';
import { mailValidationSchema } from './mail.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router
  .route('/')
  .get(
    // auth(USER_ROLES.user, USER_ROLES.admin),
    mailControllers.getAllMails,
  )
  .post(
    // auth(USER_ROLES.user, USER_ROLES.admin),
    validateRequest(mailValidationSchema.createMailValidation),
    mailControllers.createMail,
  );

export default router;
