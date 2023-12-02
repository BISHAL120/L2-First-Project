import { Schema, model } from 'mongoose';
import { TAcadamicSemister } from './acadamicSemister.interface';
import {
  Months,
  academicSemisterCode,
  academicSemisterName,
} from './academicSemister.const';

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

export const AcademicSemister = model<TAcadamicSemister>(
  'academicSemister',
  academicSemisterSchema,
);
