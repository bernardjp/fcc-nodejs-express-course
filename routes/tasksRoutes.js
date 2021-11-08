import { Router } from "express";
import { getAllTasks, createTask, getTask, updateTask, deleteTask } from "../controllers/tasksController.js";

const router = Router();

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

export default router;
