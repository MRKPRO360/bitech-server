import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PrebuiltProjectService } from './prebuiltProject.services';

const getAllPrebuiltProjects = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PrebuiltProjectService.getAllPrebuiltProjectsFromDB(
      req.query,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'PrebuiltProjects retrieved successfully!',
      data: result,
    });
  },
);

const getAPrebuiltProject = catchAsync(async (req: Request, res: Response) => {
  const { prebuiltProjectId } = req.params;

  const result =
    await PrebuiltProjectService.getSinglePrebuiltProjectFromDB(
      prebuiltProjectId,
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'PrebuiltProject retrieved successfully!',
    data: result,
  });
});

const createAPrebuiltProject = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PrebuiltProjectService.createPrebuiltProjectInDB(
      req.body,
    );
    console.log('ok');

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'PrebuiltProject created successfully!',
      data: result,
    });
  },
);

const updateAPrebuiltProject = catchAsync(
  async (req: Request, res: Response) => {
    const updatedData = req.body;

    const { prebuiltProjectId } = req.params;
    const result =
      await PrebuiltProjectService.updateSinglePrebuiltProjectFromDB(
        prebuiltProjectId,
        updatedData,
      );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'PrebuiltProject updated successfully!',
      data: result,
    });
  },
);

const deleteAPrebuiltProject = catchAsync(
  async (req: Request, res: Response) => {
    const { PrebuiltprojectId } = req.params;
    await PrebuiltProjectService.deletePrebuiltProjectFromDB(PrebuiltprojectId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'PrebuiltProject deleted successfully!',
      data: {},
    });
  },
);

export const PrebuiltprojectControllers = {
  getAllPrebuiltProjects,
  getAPrebuiltProject,
  updateAPrebuiltProject,
  deleteAPrebuiltProject,
  createAPrebuiltProject,
};
