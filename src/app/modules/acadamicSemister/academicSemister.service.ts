import appError from '../../Error/appError';
import { TAcadamicSemister } from './acadamicSemister.interface';
import { AcademicSemister } from './academicSeister.model';
import { academicSemisterNameCodeMapper } from './academicSemister.const';



const createAcademicSemisterIntoDB = async (payLoad: TAcadamicSemister) => {
  if(academicSemisterNameCodeMapper[payLoad.name] !== payLoad.code){
    throw new appError(404,'invalid semester code')
  }
  const result = await AcademicSemister.create(payLoad);
  return result;
};

const getAllAcademicSemisterFromDB = async () => {
  const result = await AcademicSemister.find();
  return result;
}
const getSingleAcademicSemisterFromDB = async (semisterID: string) => {
  const result = await AcademicSemister.findById({_id: semisterID});
  return result;
}
const updateSingleAcademicSemisterFromDB = async (semisterID: string,payLoad:Partial<TAcadamicSemister>) => {
  if(payLoad.name &&
    payLoad.code &&
    academicSemisterNameCodeMapper[payLoad.name] !== payLoad.code){
      throw new appError(404, 'Invalid Semister Code')
    }
  const result = await AcademicSemister.findOneAndUpdate({_id: semisterID}, payLoad, {new: true});
  return result;
}

export const academicSemisterService = {
  createAcademicSemisterIntoDB,
  getAllAcademicSemisterFromDB,
  getSingleAcademicSemisterFromDB,
  updateSingleAcademicSemisterFromDB,
};
