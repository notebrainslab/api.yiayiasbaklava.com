const httpStatus = require('http-status');
const { Op } = require('sequelize');
const StoreLocationDao = require('../dao/StoreLocationDao');
// const TokenDao = require('../dao/TokenDao');
const { tokenTypes } = require('../config/tokens');
const responseHandler = require('../helper/responseHandler');
const transFormDataHelper = require('../helper/transFormDataHelper');
const logger = require('../config/logger');

class StoreLocationService {
    constructor() {
        this.storeLocationDao = new StoreLocationDao();                  
    }
    /**
     * Create a user
     * @param {String} email
     * @param {String} password
     * @returns {Promise<{response: {code: *, message: *, status: boolean}, statusCode: *}>}
     */

    fetchStoreLocations = async () => { 
        try{
            const message = 'Data fetch successfully!';                        
                                     
            let locationData = await this.storeLocationDao.findByWhere(
                { status : 1} 
            ); 

            let transformData = transFormDataHelper.TransformData(locationData);
                                                              
            return responseHandler.returnSuccess(httpStatus.OK, message, transformData);
        }
        catch (e) {
            console.log(e);
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
        
    };

    

}

module.exports = StoreLocationService;
