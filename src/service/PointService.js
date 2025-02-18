const httpStatus = require('http-status');
const { Op } = require('sequelize');
const PointDao = require('../dao/PointDao');
// const TokenDao = require('../dao/TokenDao');
const { tokenTypes } = require('../config/tokens');
const responseHandler = require('../helper/responseHandler');
const logger = require('../config/logger');

class PointService {
    constructor() {
        this.pointDao = new PointDao();                  
    }
    /**
     * Create a user
     * @param {String} email
     * @param {String} password
     * @returns {Promise<{response: {code: *, message: *, status: boolean}, statusCode: *}>}
     */

    fetchPointHistory = async (userId) => { 
        try{
            const message = 'Data fetch successfully!';                        
                                         
            let pointHistoryData = await this.pointDao.fetchPointThroughOrder(userId); 
                                                              
            return responseHandler.returnSuccess(httpStatus.OK, message, pointHistoryData);
        }
        catch (e) {
            console.log(e);
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
        
    };

    

}

module.exports = PointService;
