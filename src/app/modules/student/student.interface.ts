import { Model, Types } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TGuardian = {
  fatherName: string;
  fatherAddress: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherAddress: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImages?: string;
  isDeleted: boolean;
};

export type studentMethod = {
  // eslint-disable-next-line no-unused-vars
  isStudentExists(id: string): Promise<TStudent | null>;
};

export type studentModel = Model<
  TStudent,
  Record<string, never>,
  studentMethod
>;
