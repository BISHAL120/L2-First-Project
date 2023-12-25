import { userService } from './user.service';
import catchAsync from '../../utils/catchAsync';
import { json } from 'express';

const createStudent = catchAsync(async (req, res) => {
  const { password, students } = req.body;
  const result = await userService.createStudentIntoDB(password, students);
  res.status(200).json({
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await userService.createFacultyIntoDB(password, facultyData);

  res.status(200).json({
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
};
