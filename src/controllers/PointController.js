const httpStatus = require('http-status');
const AuthService = require('../service/AuthService');
const TokenService = require('../service/TokenService');
const UserService = require('../service/UserService');
const PointService = require('../service/PointService');
const logger = require('../config/logger');
const { tokenTypes } = require('../config/tokens');

class PointController{
    constructor() {
        this.userService = new UserService();
        this.tokenService = new TokenService();
        this.authService = new AuthService();       
        this.pointService = new PointService();       
    }
   
    fetchPointHistory = async (req, res) => {
        try {              
            const pointHistory = await this.pointService.fetchPointHistory(req.userId); 
            
            const { status } = pointHistory.response;            
            const { message, data } = pointHistory.response;
            
            res.status(pointHistory.statusCode).send({ status, message, data });
        } catch (e) {
            console.log(e)
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}

module.exports = PointController;
