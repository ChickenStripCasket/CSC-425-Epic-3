import { Router } from 'express';
import { apiError, apiResponse } from '../../lib/api.js';
import { createUser } from '../../database/proxy.js';

const router = Router();

router.post('/users', (req, res) => {
    // query the API
    createUser()
        .then(userId => apiResponse(res, {id: userId}, 200)) 
        .catch(error => apiError(res, error, 404)) 
})

export default router