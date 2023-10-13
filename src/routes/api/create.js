import { Router } from 'express';
import { apiError, apiResponse } from '../../lib/api.js';
import {createTask} from '../../database/proxy.js';

const router = Router();

router.post('/task',(req,res) => {
    const onwerId = Number(req.query.ownerId);

    if(isNaN(ownerId)) {
        return apiError(res,'Invalid owner ID was provided',400);
    }

    const{title,description,dueDate,completed} = req.body;

    if(!title || typeof title !== 'string' || !description || typeof description !== 'string') {
        return apiError(res,'invalid task details provided',400);
    }

    createTask(ownerId, title, description, dueDate, completed) 
        .then(task => apiResponse(res,task,201))
        .catch(error => apiError(res,error,500));
});