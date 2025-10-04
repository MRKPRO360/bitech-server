/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';

import { multerUpload } from '../../config/multer.config';
import validateRequest from '../../middleware/validateRequest';
import { PrebuiltprojectControllers } from './prebuiltProject.controller';
import { PrebuiltProjectValidationsSchema } from './prebuiltProject.validation';

const router = express.Router();

router
  .route('/')
  .get(PrebuiltprojectControllers.getAllPrebuiltProjects)
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

      req.body.images = req.body.images || {};

      // COVER IMAGE
      if (req.files && (req.files as any).thumbnail) {
        req.body.images.thumbnail = (req.files as any).thumbnail[0].path;
      }

      // PrebuiltROJECT IMAGES
      if (req.files && (req.files as any).gallery) {
        req.body.images.gallery = (req.files as any).gallery.map(
          (file: any) => file.path,
        );
      }

      next();
    },
    validateRequest(
      PrebuiltProjectValidationsSchema.createPrebuiltProjectValidationSchema,
    ),
    PrebuiltprojectControllers.createAPrebuiltProject,
  );

router
  .route('/:PrebuiltrojectId')
  .get(PrebuiltprojectControllers.getAPrebuiltProject)
  .patch(
    multerUpload.fields([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'gallery', maxCount: 5 },
    ]),
    (req: Request, res: Response, next: NextFunction) => {
      // DATA
      if (req.body.data) {
        req.body = JSON.parse(req.body.data);
      }
      req.body.images = req.body.images || {};
      // COVER IMAGE
      if (req.files && (req.files as any).thumbnail) {
        req.body.images.thumbnail = (req.files as any).thumbnail[0].path;
      }

      // PrebuiltROJECT IMAGES
      if (req.files && (req.files as any).gallery) {
        req.body.images.gallery = (req.files as any).gallery.map(
          (file: any) => file.path,
        );
      }

      next();
    },
    validateRequest(
      PrebuiltProjectValidationsSchema.updatePrebuiltProjectValidationSchema,
    ),
    PrebuiltprojectControllers.updateAPrebuiltProject,
  )
  .delete(PrebuiltprojectControllers.deleteAPrebuiltProject);

export default router;
