const express = require('express');
const router = express.Router();

/* GET task */
router.get('/task', (req, res, next) => {
    const response = {
        message: 'Read Response'
    }
    res.json(response)
})

module.exports = router;
