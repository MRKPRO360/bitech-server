import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EmployeeServices } from './employee.service';

const getAllEmployees = catchAsync(async (req, res) => {
  const employees = await EmployeeServices.getAllEmployeesFromDB(req?.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Employees retrieved successfully',
    data: employees,
  });
});

const getSingleEmployee = catchAsync(async (req, res) => {
  const { id } = req.params;
  const employee = await EmployeeServices.getSingleEmployeeFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Employee retrieved successfully',
    data: employee,
  });
});

const updateEmployee = catchAsync(async (req, res) => {
  const result = await EmployeeServices.updateEmployeeInDB(req.body, req.file);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Employee updated successfully!',
    data: result,
  });
});

const deleteEmployee = catchAsync(async (req, res) => {
  const { id } = req.params;
  const Employee = await EmployeeServices.deleteEmployeeFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Employee deleted successfully',
    data: Employee,
  });
});

const changeEmployeeStatus = catchAsync(async (req, res) => {
  console.log(req.body);

  const employee = await EmployeeServices.changeEmployeeStatusInDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Employee status updated successfully',
    data: employee,
  });
});

export const EmployeeControllers = {
  getAllEmployees,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
  changeEmployeeStatus,
};
