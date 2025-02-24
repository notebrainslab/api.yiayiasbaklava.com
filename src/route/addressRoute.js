const express = require('express');
const AddressController = require('../controllers/AddressController');

const router = express.Router();
const auth = require('../middlewares/auth');

const addressController = new AddressController();

router.post(
    '/add-address',
    auth(),    
    addressController.addAddress,
);

module.exports = router;
