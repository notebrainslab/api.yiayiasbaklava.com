const httpStatus = require('http-status');
const AuthService = require('../service/AuthService');
const TokenService = require('../service/TokenService');
const UserService = require('../service/UserService');
const PointService = require('../service/PointService');
const logger = require('../config/logger');
const { tokenTypes } = require('../config/tokens');

class PointController{
    constructor() {
        this.userService = new UserService();
        this.tokenService = new TokenService();
        this.authService = new AuthService();       
        this.pointService = new PointService();       
    }
   
    fetchPointHistory = async (req, res) => {
        try {              
            const pointHistory = await this.pointService.fetchPointHistory(req.userId); 
            
            const { status } = pointHistory.response;            
            const { message, data } = pointHistory.response;
            
            res.status(pointHistory.statusCode).send({ status, message, data });
        } catch (e) {
            console.log(e)
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    fetchMembershipTier = async (req, res) => {
        try {              
            const membershipTier = await this.pointService.fetchMembershipTier(req.userId); 
           
            const { status } = membershipTier.response;            
            const { message, data } = membershipTier.response;
            
            res.status(membershipTier.statusCode).send({ status, message, data });
        } catch (e) {
            console.log(e)
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    fetchLeaderboard = async (req, res) => {
        try {              
            const leaderboard = await this.pointService.fetchLeaderboard(); 
            
            const { status } = leaderboard.response;            
            const { message, data } = leaderboard.response;
            
            res.status(leaderboard.statusCode).send({ status, message, data });
        } catch (e) {
            console.log(e)
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    productVote = async (req, res) => {
        try {  
            const voteData = req.body;           
            const ProductVote = await this.pointService.productVote(voteData, req.userId ); 
            
            const { status } = ProductVote.response;            
            const { message } = ProductVote.response;
            
            res.status(ProductVote.statusCode).send({ status, message });
        } catch (e) {
            console.log(e)
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}

module.exports = PointController;
