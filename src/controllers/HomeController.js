const httpStatus = require('http-status');
const AuthService = require('../service/AuthService');
const TokenService = require('../service/TokenService');
const UserService = require('../service/UserService');
const HomeService = require('../service/HomeService');
const logger = require('../config/logger');
const { tokenTypes } = require('../config/tokens');

class HomeController {
    constructor() {
        this.userService = new UserService();
        this.tokenService = new TokenService();
        this.authService = new AuthService();
        this.homeService = new HomeService();
    }
   
    fetchHomeData = async (req, res) => {
        try {              
            const homeData = await this.homeService.fetchData(); 
            
            const { status } = homeData.response;            
            const { message, data } = homeData.response;
            
            res.status(homeData.statusCode).send({ status, message, data });
        } catch (e) {
            console.log(e)
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    fetchCms = async (req, res) => {
        try {              
            const CmsData = await this.homeService.fetchCms(); 
            
            const { status } = CmsData.response;            
            const { message, data } = CmsData.response;
            
            res.status(CmsData.statusCode).send({ status, message, data });
        } catch (e) {
            console.log(e)
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    fetchSupportContent = async (req, res) => {
        try {              
                        
        } catch (e) {
            console.log(e)
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}

module.exports = HomeController;
