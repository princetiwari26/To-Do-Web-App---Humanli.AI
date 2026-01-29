import express from 'express';
import { createTodo, getTodos, updateTodo, deleteTodo } from '../controllers/todo.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();
router.use(protect);

router.post('/', createTodo);
router.get('/:boardId', getTodos);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;