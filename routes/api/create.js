const express = require('express');
const router = express.Router();

/* POST API */
router.post('/task', (req, res, next) => {
    const response = {
        message: 'Post Response'
    }
    res.json(response)
})

module.exports = router;
