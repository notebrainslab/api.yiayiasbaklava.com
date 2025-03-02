const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const UserDao = require('../dao/UserDao');
const responseHandler = require('../helper/responseHandler');
const logger = require('../config/logger');
const { userConstant } = require('../config/constant');

class UserService {
    constructor() {
        this.userDao = new UserDao();
    }

    /**
     * Create a user
     * @param {Object} userBody
     * @returns {Object}
     */
    createUser = async (userBody) => {
        try {
            let message = 'Successfully Registered the account! Please Verify your email.';
            if (await this.userDao.isEmailExists(userBody.email)) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Email already taken');
            }
            
            const uuid = uuidv4();

            userBody.uuid = uuid;
            userBody.name = userBody.name;
            userBody.email = userBody.email;
            userBody.email_verified_at = userConstant.EMAIL_VERIFIED_FALSE;
            userBody.phone = userBody.phone;
            userBody.password = bcrypt.hashSync(userBody.password, 8);                       
            userBody.is_active = userConstant.STATUS_ACTIVE;
            
            let userData = await this.userDao.create(userBody);

            if (!userData) {
                message = 'Registration Failed! Please Try again.';
                return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
            }
          
            userData = userData.toJSON();
            delete userData.password;
            delete userData.email_verified_at;

            return responseHandler.returnSuccess(httpStatus.CREATED, message, userData);
        } catch (e) {
            console.log(e);
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    };

    updateUser = async (userBody, id) => {
        try {
            let message = 'Profile updated successfully!';                    
            userBody.name = userBody.name;
            userBody.email = userBody.email;            
            userBody.phone = userBody.phone;
                        
            let userInfo = await this.userDao.updateById(userBody, id);
                      
            if (!userInfo) {
                message = 'Failed to update! Please Try again.';
                return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
            }
            
            userInfo = await this.userDao.findById(id);
            userInfo = userInfo.toJSON();
            delete userInfo.password;
            delete userInfo.email_verified_at;
            delete userInfo.deletedAt;
            delete userInfo.gender;
            delete userInfo.birthday;

            return responseHandler.returnSuccess(httpStatus.CREATED, message, userInfo);
        } catch (e) {
            console.log(e);
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    };

    /**
     * Get user
     * @param {String} email
     * @returns {Object}
     */

    isEmailExists = async (email) => {
        const message = 'Email found!';
        if (!(await this.userDao.isEmailExists(email))) {
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Email not Found!!');
        }
        return responseHandler.returnSuccess(httpStatus.OK, message);
    };

    getUserByUuid = async (uuid) => {
        return this.userDao.findOneByWhere({ uuid });
    };

    changePassword = async (data, uuid) => {
        let message = 'Successfully updated password';
        let statusCode = httpStatus.OK;
        let user = await this.userDao.findOneByWhere({ uuid });

        if (!user) {
            return responseHandler.returnError(httpStatus.NOT_FOUND, 'User Not found!');
        }

        if (data.password !== data.confirm_password) {
            return responseHandler.returnError(
                httpStatus.BAD_REQUEST,
                'Confirm password not matched',
            );
        }

        // const isPasswordValid = await bcrypt.compare(data.old_password, user.password);
        // user = user.toJSON();
        // delete user.password;
        // if (!isPasswordValid) {
        //     statusCode = httpStatus.BAD_REQUEST;
        //     message = 'Wrong old Password!';
        //     return responseHandler.returnError(statusCode, message);
        // }
        const updateUser = await this.userDao.updateWhere(
            { password: bcrypt.hashSync(data.password, 8) },
            { uuid },
        );

        if (updateUser) {
            return responseHandler.returnSuccess(
                httpStatus.OK,
                'Password updated Successfully!',
                {},
            );
        }

        return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Password Update Failed!');
    };
}

module.exports = UserService;
