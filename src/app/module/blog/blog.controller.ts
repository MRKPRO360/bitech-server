import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { blogServices } from './blog.service';
import sendResponse from '../../utils/sendResponse';

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.getAllBlogsFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blogs retrieved successfully!',
    data: result,
  });
});

const getABlog = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;

  const result = await blogServices.getSingleBlogFromDB(blogId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog retrieved successfully!',
    data: result,
  });
});

const createABlog = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.createBlogInDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Blog created successfully!',
    data: result,
  });
});

const updateABlog = catchAsync(async (req: Request, res: Response) => {
  const updatedData = req.body;
  const { blogId } = req.params;
  const result = await blogServices.updateBlogInDB(blogId, updatedData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog updated successfully!',
    data: result,
  });
});

const deleteABlog = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;
  await blogServices.deleteBlogFromDB(blogId);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Blog deleted successfully!',
    data: {},
  });
});

export const blogControllers = {
  getAllBlogs,
  getABlog,
  updateABlog,
  deleteABlog,
  createABlog,
};
