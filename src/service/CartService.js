const httpStatus = require('http-status');
const { Op } = require('sequelize');
const CartDao = require('../dao/CartDao');
const { tokenTypes } = require('../config/tokens');
const responseHandler = require('../helper/responseHandler');
const logger = require('../config/logger');

class CartService {
    constructor() {
        this.cartDao = new CartDao();                  
    }
    /**
     * Create a user
     * @param {String} email
     * @param {String} password
     * @returns {Promise<{response: {code: *, message: *, status: boolean}, statusCode: *}>}
     */

    addToCart = async (userId, cartBody) => { 
        try{
            let message = 'the product has been successfully added to your cart!'; 
            const product = await this.cartDao.getProductPriceByProductId(cartBody.product_id);             
              
            if ((await this.cartDao.iskProductExists(userId, cartBody.product_id))) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'This product is already in your cart!');
            }
            
            cartBody.shop_customer_id = userId;                    
            cartBody.shop_product_id = cartBody.product_id;                     
            cartBody.price = product.price;                     
            cartBody.quantity = cartBody.quantity;    
            
            let cartData = await this.cartDao.create(cartBody); 

             if (!cartData) {
                message = 'Failed to add! Please Try again.';
                return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
            }   

            cartData = cartData.toJSON();
            
            delete cartData.shop_customer_id;
            delete cartData.updatedAt;
            delete cartData.createdAt;

            return responseHandler.returnSuccess(httpStatus.OK, message, cartData);
        }
        catch (e) {
            console.log(e);
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
        
    };

    RemoveFromCart = async (userId, cartBody) => { 
        try{
            let message = 'the product has been successfully remove from your cart!'; 
                                      
            if ((await this.cartDao.isValidCustomerC(userId, cartBody.cart_id))) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'This cart product does not belong to you!');
            }
                   
            const whereCondition = {
                id : cartBody.cart_id
            };

            let removedCart = await this.cartDao.deleteByWhere(whereCondition); 

            if (!removedCart) {
                message = 'Failed to remove! Please Try again.';
                return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
            }   
          
            return responseHandler.returnSuccess(httpStatus.OK, message);
        }
        catch (e) {
            console.log(e);
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
        
    };

    updateCartQuantity = async (userId, cartBody) => { 
        try{
            let message = 'cart quatity has been successfully updated!'; 
                                      
            if ((await this.cartDao.isValidCustomerC(userId, cartBody.cart_id))) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'This cart product does not belong to you!');
            }

            const cartId = cartBody.cart_id;             
            
            let beforeUpdateCartetails = await this.cartDao.findById(cartId);
            let quantity = beforeUpdateCartetails.quantity;
            if(cartBody.flag == 0)
            {
                if(beforeUpdateCartetails.quantity <= 1)
                {
                    return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Minimum quantity is 1!');
                }
                quantity = (beforeUpdateCartetails.quantity) - 1;
            }
            else
            {
                quantity = (beforeUpdateCartetails.quantity) + 1;
            }
            
            const data = {
                quantity : quantity
            };
            let updateCart = await this.cartDao.updateById(data, cartBody.cart_id); 
            let afterUpdateCartetails = await this.cartDao.findById(cartId);
            afterUpdateCartetails = afterUpdateCartetails.toJSON();

            delete afterUpdateCartetails.createdAt;
            delete afterUpdateCartetails.updatedAt;
            delete afterUpdateCartetails.deletedAt;

            if (!updateCart) {
                message = 'Failed to update! Please Try again.';
                return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
            }   
          
            return responseHandler.returnSuccess(httpStatus.OK, message, afterUpdateCartetails);
        }
        catch (e) {
            console.log(e);
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
        
    };

    cartDetails = async (userId) => { 
        try{
            let message = 'Data fetch successfully'; 
                                                            
            let cartData = await this.cartDao.getCartDetails(userId); 

            if (!cartData) {
                message = 'No data found.';
                return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
            }   
          
            return responseHandler.returnSuccess(httpStatus.OK, message, cartData);
        }
        catch (e) {
            console.log(e);
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
        
    };
}

module.exports = CartService;
