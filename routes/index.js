const express = require('express');
const router = express.Router();

const userRoutes = require('./users');

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World]'
    res.send('Hello World');
});

router.use('/users', userRoutes);

module.exports = router;