import express from 'express';
const router = express.Router();

/* GET task */
router.get('/task', (req, res, next) => {
    return res.json(new ApiResponse(
        {
            message: 'Hello world'
        },
        null,
        200
    ))
})


export default router