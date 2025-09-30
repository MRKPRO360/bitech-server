/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';

import { multerUpload } from '../../config/multer.config';
import { projectControllers } from './project.controller';
import { projectValidationsSchema } from './project.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router
  .route('/')
  .get(projectControllers.getAllProjects)
  .post(
    multerUpload.fields([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'gallery', maxCount: 5 },
    ]),
    (req: Request, res: Response, next: NextFunction) => {
      // DATA
      if (req.body.data) {
        req.body = JSON.parse(req.body.data);
      }

      // COVER IMAGE
      if (req.files && (req.files as any).thumbnail) {
        req.body.thumbnail = (req.files as any).thumbnail[0].path;
      }

      // PROJECT IMAGES
      if (req.files && (req.files as any).gallery) {
        req.body.gallery = (req.files as any).gallery.map(
          (file: any) => file.path,
        );
      }

      next();
    },
    validateRequest(projectValidationsSchema.createProjectValidationSchema),
    projectControllers.createAProject,
  );

router
  .route('/:projectId')
  .get(projectControllers.getAProject)
  .patch(
    validateRequest(projectValidationsSchema.updateProjectValidationSchema),
    projectControllers.updateAProject,
  )
  .delete(projectControllers.deleteAProject);

export default router;
