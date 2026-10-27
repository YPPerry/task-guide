// taskRoutes.ts - connects endpoint to controller functions
import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  getTaskById,
  updateTask,
} from "../controllers/taskcontroller";
import { validateId } from "../midlleware/validated";

//All paths here startg with api/tasks (see/api/.ts)
// This follows RESTAPI

const router = Router();

router.post("/", createTask);
router.get("/", getAllTask);
router.patch("/:id", validateId, updateTask);
router.delete("/:id", validateId, deleteTask);
router.get("/:id", validateId, getTaskById);
export default router;
