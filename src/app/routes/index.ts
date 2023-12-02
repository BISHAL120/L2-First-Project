import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.routs';
import { academicSemisterRoute } from '../modules/acadamicSemister/academicSemister.Route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semister',
    route: academicSemisterRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
