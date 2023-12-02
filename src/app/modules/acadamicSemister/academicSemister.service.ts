import { TAcadamicSemister } from './acadamicSemister.interface';
import { AcademicSemister } from './academicSeister.model';

const createAcademicSemisterIntoDB = async (payLoad: TAcadamicSemister) => {
  const result = await AcademicSemister.create(payLoad);
  return result;
};

export const academicSemisterService = {
  createAcademicSemisterIntoDB,
};
