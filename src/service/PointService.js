const httpStatus = require('http-status');
const { Op } = require('sequelize');
const PointDao = require('../dao/PointDao');
const WeeklyShowcaseDao = require('../dao/WeeklyShowcaseDao');
const ProductVoteDao = require('../dao/ProductVoteDao');
const MembershipTierDao = require('../dao/MembershipTierDao');
// const TokenDao = require('../dao/TokenDao');
const { tokenTypes } = require('../config/tokens');
const responseHandler = require('../helper/responseHandler');
const logger = require('../config/logger');
const { userConstant } = require('../config/constant');

require('dotenv').config();

const IMAGE_URL = process.env.IMAGE_URL

class PointService {
    constructor() {
        this.pointDao = new PointDao();                  
        this.productVoteDao = new ProductVoteDao();                  
        this.weeklyShowcaseDao = new WeeklyShowcaseDao();                  
        this.membershipTierDao = new MembershipTierDao();                  
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
                                         
            let pointHistoryData = await this.pointDao.fetchPointHistoryThroughOrder(userId); 
                                                              
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

                tierJson.image = {
                    url : `${IMAGE_URL}/storage/${tierJson.image}`,
                }
                           
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

    productVote = async (voteData, userId) => { 
        try{
            const message = 'Successfully Voted!'; 
                     
            let weeklyShowCase = await this.weeklyShowcaseDao.fetchCurrentWeekData();
            
            if (await this.productVoteDao.hasAlreadyVoted(userId, weeklyShowCase.id, voteData.product_id)) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Already voted!');
            }
            
            voteData.customer_id = userId;
            voteData.product_id = voteData.product_id;
            voteData.weekly_showcase_id = weeklyShowCase.id;
            voteData.status = userConstant.STATUS_ACTIVE;            
                        
            let addVoteToProduct = await this.productVoteDao.create(voteData);

            if (!addVoteToProduct) {
                message = 'Failed to record your vote! Please Try again.';
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

}

module.exports = PointService;
