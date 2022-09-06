import express from 'express';
import {
  getNoteById,
  getNotes,
  CreateNote,
  DeleteNote,
  UpdateNote,
  getNotesUser,
} from '../controllers/noteController.js';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(getNotes);

router.route('/notesUser').get(protect, getNotesUser);
router
  .route('/:id')
  .get(getNoteById)
  .delete(protect, DeleteNote)
  .put(protect, UpdateNote);
router.route('/create').post(CreateNote);

export default router;
