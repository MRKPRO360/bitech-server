import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { projectService } from './project.services';
import sendResponse from '../../utils/sendResponse';

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const result = await projectService.getAllProjectsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Projects retrieved successfully!',
    data: result,
  });
});

const getAProject = catchAsync(async (req: Request, res: Response) => {
  const { projectId } = req.params;

  const result = await projectService.getSingleProjectFromDB(projectId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Project retrieved successfully!',
    data: result,
  });
});

const createAProject = catchAsync(async (req: Request, res: Response) => {
  const result = await projectService.createProjectInDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Project created successfully!',
    data: result,
  });
});

const updateAProject = catchAsync(async (req: Request, res: Response) => {
  const updatedData = req.body;
  console.log(updatedData);

  const { projectId } = req.params;
  const result = await projectService.updateSingleProjectFromDB(
    projectId,
    updatedData,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Project updated successfully!',
    data: result,
  });
});

const deleteAProject = catchAsync(async (req: Request, res: Response) => {
  const { projectId } = req.params;
  await projectService.deleteProjectFromDB(projectId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Project deleted successfully!',
    data: {},
  });
});

export const projectControllers = {
  getAllProjects,
  getAProject,
  updateAProject,
  deleteAProject,
  createAProject,
};
