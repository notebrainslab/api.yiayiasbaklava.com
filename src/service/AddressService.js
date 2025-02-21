const httpStatus = require('http-status');
const { Op } = require('sequelize');
const AddressDao = require('../dao/AddressDao');
// const TokenDao = require('../dao/TokenDao');
const { tokenTypes } = require('../config/tokens');
const responseHandler = require('../helper/responseHandler');
const logger = require('../config/logger');
const UserService = require('./UserService');
const transFormDataHelper = require('../helper/transFormDataHelper');

class AddressService {
    constructor() {
        this.addressDao = new AddressDao();                                         
    }

    /**
     * Create a user
     * @param {String} email
     * @param {String} password
     * @returns {Promise<{response: {code: *, message: *, status: boolean}, statusCode: *}>}
     */

    addAddress = async (userId, addressBody) => { 
        try{
            const message = 'Successfully Add address!';
                        
            addressBody.country = addressBody.country;                    
            addressBody.street = addressBody.street;                    
            addressBody.city = addressBody.city;                     
            addressBody.state = addressBody.state;                     
            addressBody.zip = addressBody.zip;    
            addressBody.full_address = `${addressBody.street, addressBody.zip, addressBody.city}`; 

            let addressData = await this.addressDao.SaveAddress(userId, addressBody); 

            if (!addressData) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Failed to save address!');
            }
                                                            
            return responseHandler.returnSuccess(httpStatus.OK, message);
        }
        catch (e) {
            console.log(e);
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
        
    };

}  

module.exports = AddressService;
