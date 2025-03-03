const httpStatus = require('http-status');
const { Op } = require('sequelize');
const WeeklyShowcaseDao = require('../dao/WeeklyShowcaseDao');
const SupportDao = require('../dao/SupportDao');
const MasterSettingDao = require('../dao/MasterSettingDao');
// const TokenDao = require('../dao/TokenDao');
const { tokenTypes } = require('../config/tokens');
const responseHandler = require('../helper/responseHandler');
const logger = require('../config/logger');
const UserService = require('./UserService');
const transFormDataHelper = require('../helper/transFormDataHelper');

class HomeService {
    constructor() {
        this.WeeklyShowcaseDao = new WeeklyShowcaseDao();                  
        this.supportDao = new SupportDao();                  
        this.masterSettingDao = new MasterSettingDao();                  
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

    fetchCms = async () => { 
        try{
            const message = 'Data fetch successfully!';

            let cmsData = {};
            cmsData.privacy_policy = {
                title : "Privacy Policy",
                value : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
            };

            cmsData.terms_condition = {
                title : "Terms and Conditions",
                value : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
            };
                                                                                    
            return responseHandler.returnSuccess(httpStatus.OK, message, cmsData);
        }
        catch (e) {
            console.log(e);
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
        
    };

    fetchSupportContent = async () => { 
        try{
            const message = 'Data fetch successfully!';     
            const whereCondition = {
                is_active : 1
            }  

            let supoortContent = {};
            
            let contactDetails = await this.masterSettingDao.fetchMasterSettingsData();
            
            let supportData = await this.supportDao.findByWhere(whereCondition);
                    
            let transformData = transFormDataHelper.TransformData(supportData);

            supoortContent.faq = transformData;
            supoortContent.contact_us = 
            {
               customer_service : contactDetails.phoneNumber, 
               email : contactDetails.emailAddress,
               website : ''
            };        
            
            return responseHandler.returnSuccess(httpStatus.OK, message, supoortContent);
        }
        catch (e) {
            console.log(e);
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
        
    };

}  

module.exports = HomeService;
