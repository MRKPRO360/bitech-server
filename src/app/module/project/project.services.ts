import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { slugify } from '../../utils/slugify';
import { projectSearchableFields } from './project.constant';
import { IProject } from './project.interface';
import Project from './project.model';

const createProjectInDB = async (payload: IProject) => {
  const slug = slugify(payload.title);

  let uniqueSlug = slug;
  let counter = 1;

  while (await Project.findOne({ slug: uniqueSlug })) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }
  return await Project.create({ ...payload, slug: uniqueSlug });
};

const getAllProjectsFromDB = async (query: Record<string, unknown>) => {
  const projectsQuery = new QueryBuilder(
    Project.find({ isDeleted: { $ne: true } }),
    query,
  )
    .search(projectSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await projectsQuery.countTotal();
  const result = await projectsQuery.modelQuery;

  return {
    meta,
    result,
  };
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
