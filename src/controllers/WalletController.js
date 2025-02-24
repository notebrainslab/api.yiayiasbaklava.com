const httpStatus = require('http-status');
const AuthService = require('../service/AuthService');
const TokenService = require('../service/TokenService');
const UserService = require('../service/UserService');
const WalletService = require('../service/WalletService');
const logger = require('../config/logger');
const { tokenTypes } = require('../config/tokens');

class WalletController {
    constructor() {
        this.userService = new UserService();
        this.tokenService = new TokenService();
        this.authService = new AuthService();               
        this.walletService = new WalletService();               
    }
   
    fetchWalletTransactions = async (req, res) => {
        try {              
            const walletTransactions = await this.walletService.fetchWalletTransactions(req.userId); 
            
            const { status } = walletTransactions.response;            
            const { message, data } = walletTransactions.response;
            
            res.status(walletTransactions.statusCode).send({ status, message, data });
        } catch (e) {
            console.log(e)
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}

module.exports = WalletController;
