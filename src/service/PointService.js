const httpStatus = require('http-status');
const { Op } = require('sequelize');
const PointDao = require('../dao/PointDao');
const WeeklyShowcaseDao = require('../dao/WeeklyShowcaseDao');
// const TokenDao = require('../dao/TokenDao');
const { tokenTypes } = require('../config/tokens');
const responseHandler = require('../helper/responseHandler');
const logger = require('../config/logger');

class PointService {
    constructor() {
        this.pointDao = new PointDao();                  
        this.weeklyShowcaseDao = new WeeklyShowcaseDao();                  
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

    fetchMembershipTier = async (userId) => { 
        try{
            const message = 'Data fetch successfully!';                        

            let membershipTierData = await this.membershipTierDao.findAll(
                { where: { status : 1}}
            ); 
            
            membershipTierData = membershipTierData.reduce((acc, tier) => {
                const tierJson = tier.toJSON();
                           
                delete tierJson.updatedAt;
                delete tierJson.createdAt;
                delete tierJson.updated_at;
                delete tierJson.created_at;
                delete tierJson.is_default;                             
                delete tierJson.status;
                           
                acc[tierJson.name] = tierJson;
                return acc;
            }, {});          
                                                                          
            return responseHandler.returnSuccess(httpStatus.OK, message, membershipTierData);
        }
        catch (e) {
            console.log(e);
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
        
    };  
        
    fetchLeaderboard = async (userId) => { 
        try{
            const message = 'Data fetch successfully!';                        
                        
            let leaderboardData = await this.weeklyShowcaseDao.fetchWeeklyTopVotedProducts();
            
            return responseHandler.returnSuccess(httpStatus.OK, message, leaderboardData);
        }
        catch (e) {
            console.log(e);
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
        
    }; 

}

module.exports = PointService;
