import { Router } from 'express';
import { registerUser, loginUser } from './auth.controller';
import { asyncHandler, validate } from '../shared/asyncHandler';
import { registerSchema, loginSchema } from './auth.validation';
const router = Router();
router.post('/register', validate(registerSchema), asyncHandler(registerUser));
router.post('/login', validate(loginSchema), asyncHandler(loginUser));
export default router;
