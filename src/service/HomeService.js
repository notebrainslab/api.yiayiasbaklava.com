const httpStatus = require('http-status');
const { Op } = require('sequelize');
const WeeklyShowcaseDao = require('../dao/WeeklyShowcaseDao');
// const TokenDao = require('../dao/TokenDao');
const { tokenTypes } = require('../config/tokens');
const responseHandler = require('../helper/responseHandler');
const logger = require('../config/logger');
const UserService = require('./UserService');

class HomeService {
    constructor() {
        this.WeeklyShowcaseDao = new WeeklyShowcaseDao();                  
    }
    /**
     * Create a user
     * @param {String} email
     * @param {String} password
     * @returns {Promise<{response: {code: *, message: *, status: boolean}, statusCode: *}>}
     */

    fetchData = async () => { 
        try{
            const message = 'Data fetch successfully!';
            const currentDate = new Date();
            
            const whereCondition = {
                from_date: { [Op.lte]: currentDate },
                to_date: { [Op.gte]: currentDate }
            };
                     
            let homeData = await this.WeeklyShowcaseDao.fetchWithRelation(whereCondition); 
                                                            
            return responseHandler.returnSuccess(httpStatus.OK, message, homeData);
        }
        catch (e) {
            console.log(e);
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
        
    };

    

}

module.exports = HomeService;
