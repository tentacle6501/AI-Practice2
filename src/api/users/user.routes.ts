import { Router } from 'express';
import { asyncHandler, validate } from '../shared/asyncHandler.js';
import * as userController from './user.controller.js';
import { createUserSchema, updateUserSchema } from './user.validation.js';

const router = Router();

router.get('/', asyncHandler(userController.getAllUsers));
router.get('/:id', asyncHandler(userController.getUserById));
router.post(
  '/',
  validate(createUserSchema),
  asyncHandler(userController.createUser)
);
router.put(
  '/:id',
  validate(updateUserSchema),
  asyncHandler(userController.updateUser)
);
router.delete('/:id', asyncHandler(userController.deleteUser));

export default router;
