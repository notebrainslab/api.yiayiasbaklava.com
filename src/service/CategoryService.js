const httpStatus = require('http-status');
const { Op } = require('sequelize');
const CategoryDao = require('../dao/CategoryDao');
// const TokenDao = require('../dao/TokenDao');
const { tokenTypes } = require('../config/tokens');
const responseHandler = require('../helper/responseHandler');
const logger = require('../config/logger');

class CategoryService {
    constructor() {
        this.CategoryDao = new CategoryDao();                  
    }
    /**
     * Create a user
     * @param {String} email
     * @param {String} password
     * @returns {Promise<{response: {code: *, message: *, status: boolean}, statusCode: *}>}
     */

    fetchCategoryWithProduct = async () => { 
        try{
            const message = 'Data fetch successfully!';            
            
            let productData = await this.CategoryDao.fetchCategoryWithProductRelation(); 
                                                              
            return responseHandler.returnSuccess(httpStatus.OK, message, productData);
        }
        catch (e) {
            console.log(e);
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
        
    };

    

}

module.exports = CategoryService;
