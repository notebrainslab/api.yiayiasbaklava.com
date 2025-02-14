const httpStatus = require('http-status');
const { Op } = require('sequelize');
const OrderDao = require('../dao/OrderDao');
// const TokenDao = require('../dao/TokenDao');
const { tokenTypes } = require('../config/tokens');
const responseHandler = require('../helper/responseHandler');
const logger = require('../config/logger');

class OrderService {
    constructor() {
        this.orderDao = new OrderDao();                  
    }
    /**
     * Create a user
     * @param {String} email
     * @param {String} password
     * @returns {Promise<{response: {code: *, message: *, status: boolean}, statusCode: *}>}
     */

    fetchOrderHistory = async (userId) => { 
        try{
            const message = 'Data fetch successfully!';            
            // const currentDate = new Date();
            
            const whereCondition = {
                shop_customer_id: userId,           
            };
                     
            let orderHistoryData = await this.orderDao.fetchOrdersWithTotalAmount(whereCondition); 
                                                              
            return responseHandler.returnSuccess(httpStatus.OK, message, orderHistoryData);
        }
        catch (e) {
            console.log(e);
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
        
    };

    

}

module.exports = OrderService;
