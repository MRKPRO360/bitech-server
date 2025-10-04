import { Request, Response } from 'express';

import { mailServices } from './mail.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const getAllMails = catchAsync(async (req: Request, res: Response) => {
  const result = await mailServices.getAllMailsFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Mails retrieved successfully!',
    data: result,
  });
});
const createMail = catchAsync(async (req: Request, res: Response) => {
  const result = await mailServices.createMailInDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Mail created successfully!',
    data: result,
  });
});

export const mailControllers = {
  createMail,
  getAllMails,
};
