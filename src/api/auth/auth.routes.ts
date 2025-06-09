import { Router } from 'express';
import { registerUser, loginUser } from './auth.controller.js';
import { asyncHandler, validate } from '../shared/asyncHandler.js';
import { registerSchema, loginSchema } from './auth.validation.js';

const router = Router();

router.post('/register', validate(registerSchema), asyncHandler(registerUser));
router.post('/login', validate(loginSchema), asyncHandler(loginUser));

export default router; 