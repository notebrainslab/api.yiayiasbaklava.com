const httpStatus = require('http-status');
const AuthService = require('../service/AuthService');
const TokenService = require('../service/TokenService');
const UserService = require('../service/UserService');
const CategoryService = require('../service/CategoryService');
const logger = require('../config/logger');
const { tokenTypes } = require('../config/tokens');

class CategoryController {
    constructor() {
        this.userService = new UserService();
        this.tokenService = new TokenService();
        this.authService = new AuthService();       
        this.categoryService = new CategoryService();       
    }
   
    fetchCategoryWiseProduct = async (req, res) => {
        try {            
            const categoryWithProduct = await this.categoryService.fetchCategoryWithProduct(); 
            // res.send('test');
            // return false;
            const { status } = categoryWithProduct.response;            
            const { message, data } = categoryWithProduct.response;
            
            res.status(categoryWithProduct.statusCode).send({ status, message, data });
        } catch (e) {
            console.log(e)
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}

module.exports = CategoryController;
