import express, { NextFunction, Request, Response } from 'express';
// import auth from '../../middlewares/auth';
// import USER_ROLES from '../user/user.constant';
import { multerUpload } from '../../config/multer.config';
import { blogControllers } from './blog.controller';
import { blogValidationsSchema } from './blog.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router
  .route('/')
  .get(blogControllers.getAllBlogs)
  .post(
    // auth(USER_ROLES.admin, USER_ROLES.user),
    multerUpload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
      // DATA
      if (req.body.data) {
        req.body = JSON.parse(req.body.data);
      }

      // BLOG IMAGE
      if (req.file) {
        req.body.blogImage = req.file.path;
      }

      next();
    },
    validateRequest(blogValidationsSchema.createBlogValidationSchema),
    blogControllers.createABlog,
  );

router
  .route('/:blogId')
  .get(blogControllers.getABlog)
  .patch(
    // auth(USER_ROLES.admin, USER_ROLES.user),
    validateRequest(blogValidationsSchema.updateBlogValidationSchema),
    blogControllers.updateABlog,
  )
  .delete(blogControllers.deleteABlog);

export default router;
