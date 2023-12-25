import { Schema, model } from 'mongoose';
import { TAcadamicSemister } from './acadamicSemister.interface';
import {
  Months,
  academicSemisterCode,
  academicSemisterName,
} from './academicSemister.const';
import appError from '../../Error/appError';

const academicSemisterSchema = new Schema<TAcadamicSemister>(
  {
    name: {
      type: String,
      enum: academicSemisterName,
      required: true,
    },
    code: {
      type: String,
      enum: academicSemisterCode,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: Months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: Months,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

academicSemisterSchema.pre('save',async function(next) {
  const isSemisterExist = await AcademicSemister.findOne({
    name: this.name,
    year: this.year
  })
  if(isSemisterExist){
    throw new appError(404,'Semister Already Exist')
  }
  next();
})

export const AcademicSemister = model<TAcadamicSemister>(
  'academicSemister',
  academicSemisterSchema,
);
