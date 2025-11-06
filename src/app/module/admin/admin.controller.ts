import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const updateAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.updateAdminInDB(req.body, req.file);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Customer updated successfully!',
    data: result,
  });
});

export const AdminControllers = {
  updateAdmin,
};
