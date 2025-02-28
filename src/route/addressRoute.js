const express = require('express');
const AddressController = require('../controllers/AddressController');
const AddressValidator = require('../validator/AddressValidator');

const router = express.Router();
const auth = require('../middlewares/auth');

const addressController = new AddressController();
const addressValidator = new AddressValidator();

router.post(
    '/add-address',
    auth(),    
    addressValidator.addAddressValidator,
    addressController.addAddress,
    
);

module.exports = router;
