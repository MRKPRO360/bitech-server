import AppError from '../../errors/AppError';
import { IPrebuiltProject } from './prebuiltProject.interface';
import PrebuiltProject from './prebuiltProject.model';

const createPrebuiltProjectInDB = async (payload: IPrebuiltProject) => {
  return await PrebuiltProject.create(payload);
};

const getAllPrebuiltProjectsFromDB = async () => {
  return await PrebuiltProject.find({ isDeleted: { $ne: true } });
};

const getSinglePrebuiltProjectFromDB = async (id: string) => {
  return await PrebuiltProject.findById(id);
};

const updateSinglePrebuiltProjectFromDB = async (
  id: string,
  payload: IPrebuiltProject,
) => {
  const Prebuiltproject = await PrebuiltProject.isPrebuiltProjectExistsById(id);

  if (!Prebuiltproject) throw new AppError(400, 'PrebuiltProject not found');

  return await PrebuiltProject.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

const deletePrebuiltProjectFromDB = async (id: string) => {
  const Prebuiltproject = await PrebuiltProject.isPrebuiltProjectExistsById(id);
  if (!Prebuiltproject) throw new AppError(404, 'PrebuiltProject not found');

  return await PrebuiltProject.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true },
  );
};

export const PrebuiltProjectService = {
  createPrebuiltProjectInDB,
  getAllPrebuiltProjectsFromDB,
  getSinglePrebuiltProjectFromDB,
  updateSinglePrebuiltProjectFromDB,
  deletePrebuiltProjectFromDB,
};
