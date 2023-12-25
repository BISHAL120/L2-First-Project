import express from 'express';
import { FacultyControllers } from './Faculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { updateFacultyValidationSchema } from './Faculty.validation';

const router = express.Router();

router.get('/getAllFaculties', FacultyControllers.getAllFaculties);

router.get('/:facultyID', FacultyControllers.getSingleFaculty);

router.delete('/:facultyID', FacultyControllers.deleteFaculty);

router.patch(
  '/:facultyID',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);



export const FacultyRoutes = router;
