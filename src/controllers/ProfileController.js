const httpStatus = require('http-status');
const AuthService = require('../service/AuthService');
const TokenService = require('../service/TokenService');
const UserService = require('../service/UserService');
const logger = require('../config/logger');
const { tokenTypes } = require('../config/tokens');

class ProfileController {
    constructor() {
        this.userService = new UserService();
        this.tokenService = new TokenService();
        this.authService = new AuthService();
    }
   
    updateProfile = async (req, res) => {
        try {              
            const user = await this.userService.updateUser(req.body, req.userId); 
                
            const { status } = user.response;            
            const { message, data } = user.response;
            res.status(user.statusCode).send({ status, message, data });
        } catch (e) {
            console.log(e)
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}

module.exports = ProfileController;
