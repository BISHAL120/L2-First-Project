import { userService } from './user.service';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, students } = req.body;
  const result = await userService.createStudentIntoDB(password, students);
  res.status(200).json({
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
};
