import express from 'express';
import asyncify from 'express-asyncify';

import AuthController from '@controller/auth/AuthController';
import CompanyController from '@controller/company/CompanyController';
import JasoController from '@controller/jaso/JasoController';
import UserController from '@controller/user/UserController';
import validateToken from '@utils/middleware/AuthMiddleware';

const router = asyncify(express.Router());

router.use('/auth', AuthController);
router.use('/company', CompanyController);
router.use('/jaso', JasoController);
router.use('/user', UserController);

export default router;
