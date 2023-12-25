import catchAsync from '../../utils/catchAsync';
import { AcademicFacultyService } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.createAcademicFacultyIntoDB(
    req.body,
  );

  res.status(200).json({
    succcess: true,
    message: 'Academic Faculty is created Successfully',
    data: result,
  });
});

const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.getAllAcademicFAcultiesFromDB();
  res.status(200).json({
    success: true,
    message: 'all Academic Faculties retrieved Successfully',
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { FacultyID } = req.params;
  const result =
    await AcademicFacultyService.getSingleAcademicFacultyFromDB(FacultyID);
    const messages = `${result === null ? 'Academic Faculty not Found' : 'Academic Faculty is retrieved successfully'}`
  res.status(200).json({
    success: true,
    message: messages,
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { FacultyID } = req.params;
  const payLoad = req.body;
  const result = await AcademicFacultyService.updateAcademicFacultyIntoDB(
    FacultyID,
    payLoad,
  );

  const messages = `${result === null ? 'Academic Faculty not Found' : 'Academic Faculty is Updated Successfully'}`

  res.status(200).json({
    success: true,
    message: messages,
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
