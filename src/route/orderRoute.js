const express = require('express');
const OrderController = require('../controllers/OrderController');

const router = express.Router();
const auth = require('../middlewares/auth');

const orderController = new OrderController();

router.get(
    '/order-history',
    auth(),    
    orderController.fetchOrderHistory,
);

module.exports = router;