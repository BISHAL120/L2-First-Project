import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import appError from '../../Error/appError';
import { userModel } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builders/QueryBuilders';
import { studentSearchableFields } from './student.constant';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  /*   const queryObj = { ...query };
    
    const studentSearchableField = ['email', 'name.lastName', 'presentAddress'];
    let searchTerm = '';
    
    if (query?.searchTerm) {
      searchTerm = query?.searchTerm as string;
    }
    
    const searcQuery = StudentModel.find({
      $or: studentSearchableField.map((field) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
    
    const excludField = ['searchTerm', 'sort', 'limit', 'page','fields'];
    excludField.forEach((el) => delete queryObj[el]);
    
    
    const filterQuery = searcQuery
    .find(queryObj)
    .populate('user')
    .populate('admissionSemister')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      });
  
    let sort = '-createdAt'
  
    if (query.sort) {
      sort = query.sort as string;
    }
    const sortQuery = filterQuery.sort(sort);
  
    let page = 1;
    let limit = 1;
    let skip = 0;
  
    if (query.limit) {
      limit = Number(query.limit);
    }
  
    if (query.page) {
      page = Number(query.page);
      skip = (page - 1) * limit;
    }
  
    const paginateQuery = sortQuery.skip(skip)
  
    const limitQuery = paginateQuery.limit(limit)
  
    let fields = '-__v';
  
    if(query.fields){
      fields = (query.fields as string).split(',').join(' ');
      console.log(fields);
    }
  
    const fieldQuery = await limitQuery.select(fields)
  
    return fieldQuery; */

  const studentQuery = new QueryBuilder(
    StudentModel.find()
      .populate('user')
      .populate('admissionSemister')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;

  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id })
    .populate('user')
    .populate('admissionSemister')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  if (!result) {
    throw new appError(404, 'Student not found');
  }
  return result;
};
const UpdateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentdata } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentdata,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await StudentModel.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    { new: true, runValidators: true },
  );
  if (!result) {
    throw new appError(404, 'Student not found');
  }
  return result;
};

const deleteAStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    const deleteStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteStudent) {
      throw new appError(400, 'Failed To Delete Student');
    }

    const deleteUser = await userModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new appError(400, 'Failed To Delete User');
    }

    return deleteStudent;
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    throw new appError(400, 'Failed To Find Student or user');
    await session.abortTransaction();
    await session.endSession();
  }
};

export const StudentService = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteAStudentFromDB,
  UpdateStudentIntoDB,
};
