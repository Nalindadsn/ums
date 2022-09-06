import express from 'express';
import {
  authUser,
  registerUser,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').post(registerUser);
router.post('/login', authUser);
router.route('/profile').post(protect, updateUserProfile);

router.get('/list', getUsers);

router.route('/:id').get(getUserById).put(updateUser);
// .delete(protect, DeleteNote)
// router.route('/create').post(protect, CreateNote);

export default router;
