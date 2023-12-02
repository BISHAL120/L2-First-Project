import express from 'express';
import { academicSemisterControllers } from './academicSemister.controller';
import validateRequest from '../../middleware/validateRequest';
import { academicSemisterValidations } from './academicSeister.validation';

const router = express.Router();

router.post(
  '/create-academic-semister',
  validateRequest(
    academicSemisterValidations.createAcademicSemisterValidationSchema,
  ),
  academicSemisterControllers.createAcademicSemister,
);

export const academicSemisterRoute = router;
