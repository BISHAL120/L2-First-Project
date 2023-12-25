import catchAsync from '../../utils/catchAsync';
import { AcademicDepartmentService } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.createAcademicDepartmentIntoDB(
    req.body,
  );

  res.status(200).json({
    succcess: true,
    message: 'Academic Department is created Successfully',
    data: result,
  });
});

const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.getAllAcademicDepartmentFromDB();
  res.status(200).json({
    success: true,
    message: 'all Academic Departments retrieved Successfully',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentID } = req.params;
  const result =
    await AcademicDepartmentService.getSingleAcademicDepartmentFromDB(departmentID);

  res.status(200).json({
    success: true,
    message: 'Academic Department is retrieved successfully',
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentID } = req.params;
  const payLoad = req.body
  const result =
    await AcademicDepartmentService.updateAcademicDepartmentIntoDB(departmentID, payLoad);

  res.status(200).json({
    success: true,
    message: 'Academic Department is Updated Successfully',
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
