const SuperDao = require('./SuperDao');
const { Op, Sequelize } = require('sequelize');
const models = require('../models');

const Wallet = models.shop_wallets;
const Order = models.shop_orders;

class WalletDao extends SuperDao {
    constructor() {
        super(Wallet, Order);       
    } 
    
    async WalletTransactionsForSpecificUser(userId) {
        try {   
            const results = await Wallet.findAll({
                include: {
                    model: Order,
                    where: {
                        shop_customer_id : userId
                    },
                    attributes: [] 
                }
            });
            
            return results;
        } catch (error) {
            console.error('Error fetching with relation:', error);
            throw error;
        }
    }
    
}

module.exports = WalletDao;
