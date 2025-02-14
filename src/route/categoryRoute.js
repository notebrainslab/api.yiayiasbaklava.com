const express = require('express');
const CategoryController = require('../controllers/CategoryController');

const router = express.Router();
const auth = require('../middlewares/auth');

const categoryController = new CategoryController();

router.get(
    '/product-list-category-wise',
    // auth(),    
    categoryController.fetchCategoryWiseProduct,
);

module.exports = router;