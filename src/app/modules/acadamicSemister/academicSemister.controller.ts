import catchAsync from '../../utils/catchAsync';
import { academicSemisterService } from './academicSemister.service';

const createAcademicSemister = catchAsync(async (req, res) => {
  const result = await academicSemisterService.createAcademicSemisterIntoDB(
    req.body,
  );

  res.status(200).json({
    success: true,
    message: 'Academic Semister is Created Successfully',
    data: result,
  });
});

const getAllAcademicSemister = catchAsync(async (req, res) => {
  const result = await academicSemisterService.getAllAcademicSemisterFromDB();

  res.status(200).json({
    success: true,
    message: 'Successfully get all Academic Semister',
    data: result,
  });
});

const getSingleAcademicSemister = catchAsync(async (req, res) => {
  const { semisterID } = req.params;
  const result =
    await academicSemisterService.getSingleAcademicSemisterFromDB(semisterID);
    const messages = `${result === null ? 'Academic Semister not Found' : 'Successfully get single Academic Semister'}`

  res.status(200).json({
    success: true,
    message: messages,
    data: result,
  });
});

const updateSingleAcademicSemister = catchAsync(async (req, res) => {
    const { semisterID } = req.params;
  const payLoad = req.body;
  const result =
    await academicSemisterService.updateSingleAcademicSemisterFromDB(semisterID,payLoad);

  res.status(200).json({
    success: true,
    message: 'Successfully update single Academic Semister',
    data: result,
  });
});

export const academicSemisterControllers = {
  createAcademicSemister,
  getAllAcademicSemister,
  getSingleAcademicSemister,
  updateSingleAcademicSemister,
};
