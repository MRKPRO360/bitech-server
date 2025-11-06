import express from 'express';

import { mailControllers } from './mail.controller';
import { mailValidationSchema } from './mail.validation';
import validateRequest from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middleware/auth';

const router = express.Router();

router
  .route('/')
  .get(auth(USER_ROLE.admin), mailControllers.getAllMails)
  .post(
    validateRequest(mailValidationSchema.createMailValidation),
    mailControllers.createMail,
  );
router.route('/:id').delete(auth(USER_ROLE.admin), mailControllers.deleteAMail);
router.get('/my-mails', auth(USER_ROLE.customer), mailControllers.getMyMails);

export default router;
