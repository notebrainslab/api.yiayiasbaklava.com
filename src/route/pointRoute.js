const express = require('express');
const PointController = require('../controllers/PointController');
const ProductVoteValidator = require('../validator/ProductVoteValidator');

const router = express.Router();
const auth = require('../middlewares/auth');

const pointController = new PointController();
const productVoteValidator = new ProductVoteValidator();

router.get(
    '/point-history',
    auth(),    
    pointController.fetchPointHistory,
);

router.get(
    '/membership-tier',
    auth(),    
    pointController.fetchMembershipTier,
);

router.post(
    '/product-vote',
    auth(),    
    productVoteValidator.validateVoteRequest,   
    pointController.productVote,
);

router.get(
    '/leaderboard',
    auth(),    
    pointController.fetchLeaderboard,
);

module.exports = router;