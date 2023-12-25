import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { academicDepartmentValidations } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controller';

const router = express.Router();

router.post(
  '/create-academic-department',
  validateRequest(
    academicDepartmentValidations.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
);

router.get('/getalldepartment', AcademicDepartmentControllers.getAllAcademicDepartment);

router.get('/:departmentID', AcademicDepartmentControllers.getSingleAcademicDepartment);

router.patch(
  '/:departmentID',
  validateRequest(
    academicDepartmentValidations.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;