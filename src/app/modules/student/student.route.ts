import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.get('/:studentId', StudentController.getSingleStudent);

router.delete('/:studentId', StudentController.deleteAStudent);

router.get('/', StudentController.getAllStudent);

export const StudentRoutes = router;
