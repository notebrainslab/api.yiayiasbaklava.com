const httpStatus = require('http-status');
const AuthService = require('../service/AuthService');
const TokenService = require('../service/TokenService');
const UserService = require('../service/UserService');
const ProductService = require('../service/ProductService');
const logger = require('../config/logger');
const { tokenTypes } = require('../config/tokens');

class ProductController {
    constructor() {
        this.userService = new UserService();
        this.tokenService = new TokenService();
        this.authService = new AuthService();               
        this.productService = new ProductService();               
    }
   
    productDetails = async (req, res) => {
        try {                   
            const productDetails = await this.productService.fetchProductDetails(req.body);  
            
            const { status } = productDetails.response;            
            const { message, data } = productDetails.response;
            
            res.status(productDetails.statusCode).send({ status, message, data });
        } catch (e) {
            console.log(e)
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };


    selectFlavours = async (req, res) => {
        try {                   
            const products = await this.productService.fetchProducts();  
            
            const { status } = products.response;            
            const { message, data } = products.response;
            
            res.status(products.statusCode).send({ status, message, data });
        } catch (e) {
            console.log(e)
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

}

module.exports = ProductController;
