import { Router } from 'express';
const router = Router();

/* POST API */
router.post('/task', (req, res, next) => {
    const response = {
        message: 'Post Response'
    }
    res.json(response)
})

export default router;
