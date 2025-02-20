const httpStatus = require('http-status');
const AuthService = require('../service/AuthService');
const TokenService = require('../service/TokenService');
const UserService = require('../service/UserService');
const OrderService = require('../service/OrderService');
const logger = require('../config/logger');
const { tokenTypes } = require('../config/tokens');

class OrderController {
    constructor() {
        this.userService = new UserService();
        this.tokenService = new TokenService();
        this.authService = new AuthService();       
        this.orderService = new OrderService();       
    }
   
    fetchOrderHistory = async (req, res) => {
        try {              
            const orderHistory = await this.orderService.fetchOrderHistory(req.userId); 
            
            const { status } = orderHistory.response;            
            const { message, data } = orderHistory.response;
            
            res.status(orderHistory.statusCode).send({ status, message, data });
        } catch (e) {
            console.log(e)
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    addReview = async (req, res) => {
        try {   
            const reviewData = req.body;          
            const addReview = await this.orderService.addReview(reviewData, req.userId); 
            
            const { status } = addReview.response;            
            const { message } = addReview.response;
            
            res.status(addReview.statusCode).send({ status, message });
        } catch (e) {
            console.log(e)
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    couponList = async (req, res) => {
        try { 
            const couponBody = req.body;               
            const couponList = await this.orderService.couponList(couponBody);           
            
            const { status } = couponList.response;            
            const { message, data } = couponList.response;
            
            res.status(couponList.statusCode).send({ status, message, data });
        } catch (e) {
            console.log(e)
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}

module.exports = OrderController;
