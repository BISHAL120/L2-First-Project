import config from '../../config';
import { TStudent } from '../student/student.interface';
import { TUser } from './user.interface';
import { userModel } from './user.model';
import { StudentModel } from '../student/student.model';
import { AcademicSemister } from '../acadamicSemister/academicSeister.model';
import { generateFacultyId, generateStudentID } from './user.utils';
import mongoose from 'mongoose';
import appError from '../../Error/appError';
import { TFaculty } from '../Faculty/Faculty.interface';
import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../Faculty/Faculty.model';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // created a new user
  const userData: Partial<TUser> = {};

  // set user role and password
  userData.password = password || (config.dafault_pass as string);
  userData.role = 'student';

  // find academic semister info
  const academicSemister = await AcademicSemister.findById(payload.admissionSemister)


  // Session Start From Here
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // set generated id
    userData.id = await generateStudentID(academicSemister);

    // create a user {Transaction -1}
    const newUser = await userModel.create([userData], { session });

    // created a student
    if (!newUser.length) {
      throw new appError(500, 'Failed To Create user')
    }
    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create a user {Transaction -2}
    const newStudent = await StudentModel.create([payload], { session });
    if (!newStudent.length) {
      throw new appError(500, 'Failed To Create Student')
    }

    await session.commitTransaction()
    await session.endSession()
    return { newUser, newStudent };

  } catch (error: any) {
    throw new appError(500, error);
    await session.abortTransaction();
    await session.endSession();
  };
}

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.dafault_pass as string);  

  //set student role
  userData.role = 'faculty';

  // find academic department info
  const academicDepartment = await AcademicDepartmentModel.findById(
    payload.academicDepartment
  );

  if (!academicDepartment) {
    throw new appError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await userModel.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new appError(500, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new appError(500, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};


export const userService = {
  createStudentIntoDB,
  createFacultyIntoDB,
};
