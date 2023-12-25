import { Schema, model } from 'mongoose';
import { TAcademicDepartmentn } from './academicDepartment.interface';
import appError from '../../Error/appError';

const academicDepartmentSchema = new Schema<TAcademicDepartmentn>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'academicFaculty',
    },
  },
  {
    timestamps: true,
  },
);




// academicDepartmentSchema.pre('save', async function (next) {
//   const isdepartmentExist = await AcademicDepartmentModel.findOne({ name: this.name });
//   if (isdepartmentExist) {
//     throw new appError(404,'This Department is Already Exist !!')
//   }
//   next()
// });

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicDepartmentModel.findOne(query);
  if(!isDepartmentExist) {
    throw new appError(404, 'This Department is does not Exist !!')
  }
  next();
})

export const AcademicDepartmentModel = model<TAcademicDepartmentn>(
  'academicDepartment',
  academicDepartmentSchema,
  );

