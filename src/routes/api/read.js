import { Router } from 'express';
import { apiError, apiResponse } from '../../lib/api.js';
import { getAllTasks, getTask } from '../../database/index.js';
const router = Router();

/* GET task */
router.get('/task', (req, res, next) => {
    // get the task id from the query (/api/task?id=[number])
    // ?id=[number]
    const taskId = Number(req.query.id)

    // make sure that the task ID is a valid number.
    if (isNaN(taskId)) {
        return apiError(res, 'Invalid Task ID was provided.', 400)
    }

    // query the API
    getTask(taskId)
        .then(task => apiResponse(res, task, 200)) // respond with the task that was found
        .catch(error => apiError(res, error, 404)) // respond with a 404 not found error
})

router.get('/tasks', (req, res, next) => {
    // query the API
    getAllTasks()
        .then(tasks => apiResponse(res, tasks, 200)) // respond with the list of tasks.
        .catch(error => apiError(res, error, 500)) // respond with an internal server error.
})

export default router