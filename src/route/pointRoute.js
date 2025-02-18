const express = require('express');
const PointController = require('../controllers/PointController');

const router = express.Router();
const auth = require('../middlewares/auth');

const pointController = new PointController();

router.get(
    '/point-history',
    auth(),    
    pointController.fetchPointHistory,
);

module.exports = router;