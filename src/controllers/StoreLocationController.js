const httpStatus = require('http-status');
const AuthService = require('../service/AuthService');
const TokenService = require('../service/TokenService');
const UserService = require('../service/UserService');
const StoreLocationService = require('../service/StoreLocationService');
const logger = require('../config/logger');
const { tokenTypes } = require('../config/tokens');

class StoreLocationController {
    constructor() {
        this.userService = new UserService();
        this.tokenService = new TokenService();
        this.authService = new AuthService();                   
        this.storeLocationService = new StoreLocationService();                   
    }
   
    fetchStoreLocations= async (req, res) => {
        try {              
            const StoreLocations = await this.storeLocationService.fetchStoreLocations(); 
            
            const { status } = StoreLocations.response;            
            const { message, data } = StoreLocations.response;
            
            res.status(StoreLocations.statusCode).send({ status, message, data });
        } catch (e) {
            console.log(e)
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}

module.exports = StoreLocationController;
