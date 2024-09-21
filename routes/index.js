const express = require('express');
const router = express.Router();

const userRoutes = require('./users');

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.use('/users', userRoutes);

module.exports = router;