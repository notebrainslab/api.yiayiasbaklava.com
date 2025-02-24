const httpStatus = require('http-status');
const { Op } = require('sequelize');
const WalletDao = require('../dao/WalletDao');
// const TokenDao = require('../dao/TokenDao');
const { tokenTypes } = require('../config/tokens');
const transFormDataHelper = require('../helper/transFormDataHelper');
const responseHandler = require('../helper/responseHandler');
const logger = require('../config/logger');

class WalletService {
    constructor() {
        this.walletDao = new WalletDao();                  
    }
    /**
     * Create a user
     * @param {String} email
     * @param {String} password
     * @returns {Promise<{response: {code: *, message: *, status: boolean}, statusCode: *}>}
     */

    fetchWalletTransactions = async (userId) => { 
        try{
            const message = 'Data fetch successfully!';                       
                          
            let walletTransactions = await this.walletDao.WalletTransactionsForSpecificUser(userId); 
            let transformData = transFormDataHelper.TransformData(walletTransactions);
                                                              
            return responseHandler.returnSuccess(httpStatus.OK, message, transformData);
        }
        catch (e) {
            console.log(e);
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
        
    };

}

module.exports = WalletService;
