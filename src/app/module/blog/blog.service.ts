/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/AppError';
import Blog from './blog.model';
import { IBlog } from './blog.interface';

const createBlogInDB = async (payload: IBlog) => {
  return await Blog.create(payload);
};

const getAllBlogsFromDB = async () => {
  return await Blog.find({ isDeleted: { $ne: true } });
};

const getSingleBlogFromDB = async (id: string) => {
  return await Blog.findById(id);
};

const updateBlogInDB = async (id: string, payload: Partial<IBlog>) => {
  const blog = await Blog.isBlogExistsById(id);

  if (!blog) throw new AppError(400, 'Blog not found!');

  return await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

const deleteBlogFromDB = async (id: string) => {
  const blog = await Blog.isBlogExistsById(id);

  if (!blog) throw new AppError(400, 'Blog not found!');

  return await Blog.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
      runValidators: true,
    },
  );
};

export const blogServices = {
  createBlogInDB,
  getAllBlogsFromDB,
  getSingleBlogFromDB,
  updateBlogInDB,
  deleteBlogFromDB,
};
