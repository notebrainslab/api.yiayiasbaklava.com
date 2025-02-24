const SuperDao = require('./SuperDao');
const { Op, Sequelize } = require('sequelize');
const models = require('../models');

const ProductVote = models.shop_product_votes;

class ProductVoteDao extends SuperDao {
    constructor() {
        super(ProductVote);       
    } 
    
    async hasAlreadyVoted(userId, weeklyShowCaseId, ProductId) {
        try {
            const result = await ProductVote.findOne({
                where: {
                    customer_id : userId,
                    product_id : ProductId,
                    weekly_showcase_id : weeklyShowCaseId
                },                
            });

            return !!result;
            
        } catch (error) {
            console.error('Error fetching with relation:', error);
            throw error;
        }       
                            
    }
    
}

module.exports = ProductVoteDao;
