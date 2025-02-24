const express = require('express');
const CartController = require('../controllers/CartController');
const CartValidator = require('../validator/CartValidator');

const router = express.Router();
const auth = require('../middlewares/auth');

const cartController = new CartController();
const cartValidator = new CartValidator();

router.post(
    '/add-to-cart',
    auth(),
    cartValidator.addToCartValidator,   
    cartController.addToCart,
);

router.post(
    '/remove-from-cart',
    auth(), 
    cartValidator.removeFromCartValidator,     
    cartController.RemoveFromCart,
);

router.put(
    '/update-cart-quantity',
    auth(),  
    cartValidator.updateCartQuantityValidator, 
    cartController.updateCartQuantity,
);

router.get(
    '/cart-details',
    auth(),    
    cartController.cartDetails,
);

module.exports = router;