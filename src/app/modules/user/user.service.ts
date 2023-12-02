import config from '../../config';
import { TStudent } from '../student/student.interface';
import { TUser } from './user.interface';
import { userModel } from './user.model';
import { StudentModel } from '../student/student.model';

const createStudentIntoDB = async (password: string, student: TStudent) => {
  // created a new user
  const userData: Partial<TUser> = {};

  // set user role and password
  userData.password = password || (config.dafault_pass as string);
  userData.role = 'student';

  // manually generated id
  userData.id = '2030100001';

  // create a user
  const newUser = await userModel.create(userData);

  // created a student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    student.id = newUser.id;
    student.user = newUser._id;
    const newStudent = await StudentModel.create(student);
    return { newUser, newStudent };
  }
};

export const userService = {
  createStudentIntoDB,
};
