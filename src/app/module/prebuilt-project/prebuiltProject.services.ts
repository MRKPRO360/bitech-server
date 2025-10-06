import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { slugify } from '../../utils/slugify';
import { preProjectSearchableFields } from './prebuiltProject.constant';
import { IPrebuiltProject } from './prebuiltProject.interface';
import PrebuiltProject from './prebuiltProject.model';

const createPrebuiltProjectInDB = async (payload: IPrebuiltProject) => {
  console.log(payload);

  const slug = slugify(payload.title);

  let uniqueSlug = slug;
  let counter = 1;

  while (await PrebuiltProject.findOne({ slug: uniqueSlug })) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }
  return await PrebuiltProject.create({ ...payload, slug: uniqueSlug });
};

const getAllPrebuiltProjectsFromDB = async (query: Record<string, unknown>) => {
  const prebuiltProjectsQuery = new QueryBuilder(
    PrebuiltProject.find({ isDeleted: { $ne: true } }).lean() as any,
    query,
  )
    .search(preProjectSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await prebuiltProjectsQuery.countTotal();
  const result = await prebuiltProjectsQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSinglePrebuiltProjectFromDB = async (id: string) => {
  return await PrebuiltProject.findById(id);
};

const updateSinglePrebuiltProjectFromDB = async (
  id: string,
  payload: IPrebuiltProject,
) => {
  console.log(id);

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
