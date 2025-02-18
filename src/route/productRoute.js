const express = require('express');
const ProductController = require('../controllers/ProductController');

const router = express.Router();
const auth = require('../middlewares/auth');

const productController = new ProductController();

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

module.exports = router;