import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { academicFacultyValidations } from './academicFaculty.validation';
import { AcademicFacultyControllers } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    academicFacultyValidations.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);

router.get('/getallfaculty', AcademicFacultyControllers.getAllAcademicFaculty);

router.get('/:FacultyID', AcademicFacultyControllers.getSingleAcademicFaculty);

router.patch(
  '/:FacultyID',
  validateRequest(
    academicFacultyValidations.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
);

export const AcademicFacultyRoutes = router;