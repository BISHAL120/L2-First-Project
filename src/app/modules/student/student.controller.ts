import { StudentService } from './student.service';
import catchAsync from '../../utils/catchAsync';

const getAllStudent = catchAsync(async (req, res) => {
  const result = await StudentService.getAllStudentFromDB();
  res.status(200).json({
    success: true,
    message: 'students are retrieved successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentService.getSingleStudentFromDB(studentId);
  res.status(200).json({
    success: true,
    message: 'students is retrieved successfully',
    data: result,
  });
});

const deleteAStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentService.deleteAStudentFromDB(studentId);

  res.status(200).json({
    success: true,
    message: 'students is deleted successfully',
    data: result,
  });
});

export const StudentController = {
  getAllStudent,
  getSingleStudent,
  deleteAStudent,
};
