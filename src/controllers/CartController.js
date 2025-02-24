const httpStatus = require('http-status');
const UserService = require('../service/UserService');
const AuthService = require('../service/AuthService');
const TokenService = require('../service/TokenService');
const CartService = require('../service/CartService');
const logger = require('../config/logger');
const { tokenTypes } = require('../config/tokens');

class CartController {
    constructor() { 
        this.userService = new UserService();      
        this.tokenService = new TokenService();
        this.authService = new AuthService();       
        this.cartService = new CartService();       
    }
   
    addToCart = async (req, res) => {
        try {    
            const cartBody = req.body;         
            const addToCart = await this.cartService.addToCart(req.userId, cartBody); 

            const { status } = addToCart.response;            
            const { message, data } = addToCart.response;
            
            res.status(addToCart.statusCode).send({ status, message, data });
        } catch (e) {
            console.log(e)
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    RemoveFromCart = async (req, res) => {
        try {    
            const cartBody = req.body;         
            const addToCart = await this.cartService.RemoveFromCart(req.userId, cartBody); 
                        
            const { status } = addToCart.response;            
            const { message, data } = addToCart.response;
            
            res.status(addToCart.statusCode).send({ status, message });
        } catch (e) {
            console.log(e)
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    updateCartQuantity = async (req, res) => {
        try {    
            const cartBody = req.body;    
            
            const UpdateCartQuantity = await this.cartService.updateCartQuantity(req.userId, cartBody); 
             
            const { status } = UpdateCartQuantity.response;            
            const { message, data } = UpdateCartQuantity.response;
            
            res.status(UpdateCartQuantity.statusCode).send({ status, message, data });
        } catch (e) {
            console.log(e)
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    cartDetails = async (req, res) => {
        try {                
            const cartDetails = await this.cartService.cartDetails(req.userId); 
           
            const { status } = cartDetails.response;            
            const { message, data } = cartDetails.response;
            
            res.status(cartDetails.statusCode).send({ status, message, data });
        } catch (e) {
            console.log(e)
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}

module.exports = CartController;
