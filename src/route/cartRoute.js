const express = require('express');
const CartController = require('../controllers/CartController');

const router = express.Router();
const auth = require('../middlewares/auth');

const cartController = new CartController();

router.post(
    '/add-to-cart',
    auth(),    
    cartController.addToCart,
);

router.post(
    '/remove-from-cart',
    auth(),    
    cartController.RemoveFromCart,
);

router.put(
    '/update-cart-quantity',
    auth(),    
    cartController.updateCartQuantity,
);

router.get(
    '/cart-details',
    auth(),    
    cartController.cartDetails,
);

module.exports = router;