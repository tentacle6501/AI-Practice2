import { Router } from 'express';
import { asyncHandler, validate } from '../shared/asyncHandler';
import * as userController from './user.controller';
import { createUserSchema, updateUserSchema } from './user.validation';

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
