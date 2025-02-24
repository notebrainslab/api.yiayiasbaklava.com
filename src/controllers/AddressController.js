const httpStatus = require('http-status');
const AuthService = require('../service/AuthService');
const TokenService = require('../service/TokenService');
const UserService = require('../service/UserService');
const AddressService = require('../service/AddressService');
const logger = require('../config/logger');
const { tokenTypes } = require('../config/tokens');

class AddressController {
    constructor() {
        this.userService = new UserService();
        this.tokenService = new TokenService();
        this.authService = new AuthService();
        this.addressService = new AddressService();
    }
   
    addAddress = async (req, res) => {
        try {
            let addressBody = req.body;
                          
            const addressData = await this.addressService.addAddress(req.userId, addressBody); 
            
            const { status } = addressData.response;            
            const { message, data } = addressData.response;
            
            res.status(addressData.statusCode).send({ status, message, data });
        } catch (e) {
            console.log(e)
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
        
}

module.exports = AddressController;
