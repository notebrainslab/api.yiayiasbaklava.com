const express = require('express');
const StoreLocationController = require('../controllers/StoreLocationController');

const router = express.Router();
const auth = require('../middlewares/auth');

const storeLocationController = new StoreLocationController();

router.get(
    '/store-locations',
    // auth(),    
    storeLocationController.fetchStoreLocations,
);

module.exports = router;