const httpStatus = require('http-status');
const { Op } = require('sequelize');
const OrderDao = require('../dao/OrderDao');
const CouponDao = require('../dao/CouponDao');
// const TokenDao = require('../dao/TokenDao');
const { tokenTypes } = require('../config/tokens');
const responseHandler = require('../helper/responseHandler');
const logger = require('../config/logger');
const { userConstant } = require('../config/constant');
const transFormDataHelper = require('../helper/transFormDataHelper');

class OrderService {
    constructor() {
        this.orderDao = new OrderDao();                  
        this.couponDao = new CouponDao();                  
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
                          
            let orderHistoryData = await this.orderDao.fetchOrdersWithTotalAmount(userId); 
                                                              
            return responseHandler.returnSuccess(httpStatus.OK, message, orderHistoryData);
        }
        catch (e) {
            console.log(e);
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
        
    };

    addReview = async (reviewData, userId) => { 
        try{
            const message = 'Successfully add review!';            
            // const currentDate = new Date();

            if (!await this.orderDao.isValidOrder(reviewData.order_id, userId, )) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'You are not authorized to leave a review for this order!');
            }

            const whereCondition =
            {
                id : reviewData.order_id,
                shop_customer_id : userId
            }

            reviewData.review_at = new Date().toISOString().split('T')[0];;
            reviewData.ratings = reviewData.rating;
            reviewData.review = reviewData.review;
            reviewData.review_status = userConstant.STATUS_ACTIVE;   
                          
            await this.orderDao.updateWhere(reviewData, whereCondition); 
                                                              
            return responseHandler.returnSuccess(httpStatus.OK, message);
        }
        catch (e) {
            console.log(e);
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
        
    };

    couponList = async (couponBody) => { 
        try{
            const message = 'Data fetch successfully!';            
            
            const couponList = await this.couponDao.fethCoupons(couponBody.membership_id);             

            let transformData = transFormDataHelper.TransformData(couponList);
                                                              
            return responseHandler.returnSuccess(httpStatus.OK, message, transformData);
        }
        catch (e) {
            console.log(e);
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }        
    };

}

module.exports = OrderService;
