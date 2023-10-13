import { Router } from 'express';
import { apiError, apiResponse } from '../../lib/api.js';
import { getAllTasks, getTask } from '../../database/proxy.js';
import { start } from 'repl';
const router = Router();

/* GET task */
router.get('/task', (req, res, next) => {
    // get the task id from the query (/api/task?id=[number])
    // ?id=[number]

    const ownerId = Number(req.query.ownerId)
    if (isNaN(ownerId)) {
        return apiError(res, 'Invalid owner ID was provided.', 400)
    }

    const taskId = Number(req.query.id)

    // make sure that the task ID is a valid number.
    if (isNaN(taskId)) {
        return apiError(res, 'Invalid Task ID was provided.', 400)
    }

    // query the API
    getTask(taskId, ownerId)
        .then(task => apiResponse(res, task, 200)) // respond with the task that was found
        .catch(error => apiError(res, error, 404)) // respond with a 404 not found error
})

router.get('/tasks', (req, res, next) => {
    // should return a list of all tasks, paginated
    // takes two optional query paramaters, startAt, and limit, which control pagination.

    const offset = Number(req.query.offset)
    const limit = Number(req.query.limit)
    const ownerId = Number(req.query.ownerId)

    if (isNaN(offset) || isNaN(limit) || isNaN(ownerId)) {
        return apiError(res, 'Invalid Task ID was provided.', 400)
    }

    getAllTasks(ownerId, limit, offset)        
        .then(task => apiResponse(res, task, 200)) // respond with the task that was found
        .catch(error => apiError(res, error, 404)) // respond with a 404 not found error
})

export default router