const express = require('express');
const HomeController = require('../controllers/HomeController');

const router = express.Router();
const auth = require('../middlewares/auth');

const homeController = new HomeController();

router.get(
    '/home',
    auth(),    
    homeController.fetchHomeData,
);

router.get(
    '/cms',
    // auth(),    
    homeController.fetchCms,
);

router.get(
    '/support',
    // auth(),    
    homeController.fetchSupportContent,
);

module.exports = router;
