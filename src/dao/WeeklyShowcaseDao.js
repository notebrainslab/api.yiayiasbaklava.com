const SuperDao = require('./SuperDao');
const { Op } = require('sequelize');
const models = require('../models');
// const Product = require('../models/Product');

const WeeklyShowcase = models.weekly_showcases;
const Product = models.shop_products;

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
    
}

module.exports = WeeklyShowcaseDao;
