const express = require('express');
const ProductController = require('../controllers/ProductController');
const ProductValidator = require('../validator/ProductValidator');

const router = express.Router();
const auth = require('../middlewares/auth');

const productController = new ProductController();
const productValidator = new ProductValidator();

router.post(
    '/product-details',
    // auth(),    
    productController.productDetails,
);

router.get(
    '/select-flavours',
    auth(),    
    productController.selectFlavours,
);

router.post(
    '/add-to-favourites',
    auth(), 
    productValidator.addToFavuritesValidator,    
    productController.addToFavourites,
);

router.get(
    '/favourite-list',
    auth(),    
    productController.favouriteList,
);

module.exports = router;