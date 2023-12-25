import catchAsync from '../../utils/catchAsync';
import { FacultyServices } from './Faculty.service';

const getSingleFaculty = catchAsync(async (req, res) => {
  const { facultyID } = req.params;
  const result = await FacultyServices.getSingleFacultyFromDB(facultyID);

  const messages = `${result === null ? 'Faculty not Found' : 'Faculty is retrieved successfully'}`

  res.status(200).json({
    success: true,
    message: messages,
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultiesFromDB(req.query);

  let messages = `${result === null ? 'Faculty not Found' : 'Faculty are retrieved successfully'}`
  messages = `${result.length === 0 ? 'no Faculty exist' : 'Faculty are retrieved successfully'}`

  res.status(200).json({
    success: true,
    message: messages,
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { facultyID } = req.params;
  const { faculty } = req.body;
  const result = await FacultyServices.updateFacultyIntoDB(facultyID, faculty);

  res.status(200).json({
    success: true,
    message: 'Faculty is uploaded successfully',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const { facultyID } = req.params;
  const result = await FacultyServices.deleteFacultyFromDB(facultyID);

  res.status(200).json({
    success: true,
    message: 'Faculty is deleted successfully',
    data: result,
  });
});

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};
