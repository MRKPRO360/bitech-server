import AppError from '../../errors/AppError';
import { IProject } from './project.interface';
import Project from './project.model';

const createProjectInDB = async (payload: IProject) => {
  return await Project.create(payload);
};

const getAllProjectsFromDB = async () => {
  return await Project.find({ isDeleted: { $ne: true } });
};

const getSingleProjectFromDB = async (id: string) => {
  return await Project.findById(id);
};

const updateSingleProjectFromDB = async (id: string, payload: IProject) => {
  const project = await Project.isProjectExistsById(id);

  if (!project) throw new AppError(400, 'Project not found');

  return await Project.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

const deleteProjectFromDB = async (id: string) => {
  const project = await Project.isProjectExistsById(id);
  if (!project) throw new AppError(404, 'Project not found');

  return await Project.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true },
  );
};

export const projectService = {
  createProjectInDB,
  getAllProjectsFromDB,
  getSingleProjectFromDB,
  updateSingleProjectFromDB,
  deleteProjectFromDB,
};
