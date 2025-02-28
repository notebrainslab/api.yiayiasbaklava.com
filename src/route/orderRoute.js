const express = require('express');
const OrderController = require('../controllers/OrderController');
const OrderValidator = require('../validator/OrderValidator');
const CouponValidator = require('../validator/CouponValidator');

const router = express.Router();
const auth = require('../middlewares/auth');

const orderValidator = new OrderValidator();
const couponValidator = new CouponValidator();
const orderController = new OrderController();

router.get(
    '/order-history',
    auth(),    
    orderController.fetchOrderHistory,
);

router.post(
    '/add-review',
    auth(),
    orderValidator.addReviewValidator,    
    orderController.addReview,
);

router.post(
    '/coupon-list',
    auth(),  
    couponValidator.CouponListValidator,  
    orderController.couponList,
);

module.exports = router;