import express from 'express';
import {
  authUser,
  registerUser,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  getUsersAdmin,
  getUsersCustomer,
  getUsersBoatOwner,
  getUsersinventoryManager,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').post(registerUser);
router.post('/login', authUser);
router.route('/profile').post(protect, updateUserProfile);

router.get('/list', getUsers);

router.get('/listAdmin', getUsersAdmin);
router.get('/listCustomer', getUsersCustomer);
router.get('/listBoatOwner', getUsersBoatOwner);
router.get('/listInventoryManager', getUsersinventoryManager);

router.route('/:id').get(getUserById).put(updateUser);
// .delete(protect, DeleteNote)
// router.route('/create').post(protect, CreateNote);

export default router;
