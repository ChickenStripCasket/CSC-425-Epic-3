import { Router } from 'express';
import { apiError, apiResponse } from '../../lib/api.js';
import { deleteTask, getTask } from '../../database/proxy.js';

const router = Router();

router.delete('/task', (req, res) => {

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
    deleteTask(taskId, ownerId)
        .then(task => apiResponse(res, task, 200)) 
        .catch(error => apiError(res, error, 404)) 
}
)

export default router