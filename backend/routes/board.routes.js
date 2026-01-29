import express from 'express';
import { createBoard, getBoards, deleteBoard, updateBoard } from '../controllers/board.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();
router.use(protect);

router.post('/', createBoard);
router.get('/', getBoards);
router.put("/:id", updateBoard);
router.delete('/:id', deleteBoard);


export default router;