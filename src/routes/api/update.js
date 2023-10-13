import { Router } from "express";
import { apiError, apiResponse } from "../../lib/api.js";
import { updateTask, getTask } from "../../database/proxy.js";

const router = Router();

router.put("/task", (req, res) => {
  const ownerId = Number(req.query.ownerId);

  if (isNaN(ownerId)) {
    return apiError(res, "Invalid owner ID was provided.", 400);
  }

  const taskId = Number(req.body.taskId);

  if (isNaN(taskId)) {
    return apiError(res, "Invalud Task ID was provided", 400);
  }

  const { title, description, dueDate, completed } = req.body;

  updateTask(taskId, ownerId, title, description, dueDate, completed)
    .then((task) => apiResponse(res, task, 200))
    .catch((error) => apiError(res, error, 500));
});
