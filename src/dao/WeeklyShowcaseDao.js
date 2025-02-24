const SuperDao = require('./SuperDao');
const { Op, Sequelize } = require('sequelize');
const models = require('../models');
const moment = require('moment');
// const Product = require('../models/Product');

const WeeklyShowcase = models.weekly_showcases;
const Product = models.shop_products;
const ProductVote = models.shop_product_votes;

class WeeklyShowcaseDao extends SuperDao {
    constructor() {
        super(WeeklyShowcase, Product);        
    } 
    
    async fetchWithRelation(whereCondition) {
        try {
            const results = await WeeklyShowcase.findAll({
                where: whereCondition,               
            });

            let productIds = [];
            let classicProductIds = [];
            
            results.forEach(result => {
                productIds = [...productIds, ...JSON.parse(result.product_ids)];
                classicProductIds = [...classicProductIds, ...JSON.parse(result.classic_product_ids || '[]')];
            });
             
            const products = await Product.findAll({
                where: { id: { [Op.in]: productIds } },
                attributes: ['id', 'name', 'price']
            });

            const classicProducts = await Product.findAll({
                where: { id: { [Op.in]: classicProductIds } },
                attributes: ['id', 'name', 'price']
            });

            return results.map(result => ({
                id: result.id,               
                weekly_products: products.filter(p => JSON.parse(result.product_ids).includes(String(p.id))),
                classic_products: classicProducts.filter(cp => JSON.parse(result.classic_product_ids || '[]').includes(String(cp.id)))
            }));

        } catch (error) {
            console.error('Error fetching with relation:', error);
            throw error;
        }
    }

    async fetchWeeklyTopVotedProducts() {
        try {
            const currentDate = moment().format('YYYY-MM-DD');
            const weeklyShowcase = await WeeklyShowcase.findOne({
                where: {
                    from_date: { [Op.lte]: currentDate },
                    to_date: { [Op.gte]: currentDate },
                    status: 1
                },
                raw: true,
            });

            if (!weeklyShowcase) {
                return { message: 'No weekly showcase found for the current week.' };
            }            
            
            const productIds = weeklyShowcase.product_ids
            ? JSON.parse(weeklyShowcase.product_ids)
                .map(id => Number(id))
                .filter(id => !isNaN(id) && id > 0) 
            : [];
           
            if (productIds.length === 0) {
                return { message: 'No products listed for this week.' };
            }

            const topVotedProducts = await ProductVote.findAll({ 
                attributes: [
                  'product_id',
                  [Sequelize.fn('COUNT', Sequelize.col('shop_product_votes.id')), 'vote_count'],
                ],
                where: {
                  product_id: { [Op.in]: productIds },
                },
                group: ['product_id'],
                order: [[Sequelize.literal('vote_count'), 'DESC']],
                include: [
                  {
                    model: Product,
                    attributes: ['name', 'price', 'description'],
                  },
                ],
                raw: true,
            });
          
            return topVotedProducts;

        } catch (error) {
            console.error('Error fetching with relation:', error);
            throw error;
        }
    }

    async fetchCurrentWeekData() {
        try {
            const currentDate = moment().format('YYYY-MM-DD');
            const result = await WeeklyShowcase.findOne({
                where: {
                    from_date: { [Op.lte]: currentDate },
                    to_date: { [Op.gte]: currentDate },
                    status: 1
                },                
            });

            return result;
        } catch (error) {
            console.error('Error fetching with relation:', error);
            throw error;
        }
    }    
    
}

module.exports = WeeklyShowcaseDao;
