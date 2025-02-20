const SuperDao = require('./SuperDao');
const { Op } = require('sequelize');
const models = require('../models');

const Product = models.shop_products;
const Favourite = models.favourites;

class ProductDao extends SuperDao {
    constructor() {
        super(Product);       
    } 
    
    async isProductExists(userId, productId) {
        try {                                           
            const result = await Favourite.findOne({
                where: { shop_customer_id : userId, shop_product_id : productId }
            });    

            return !!result;           
        } catch (error) {
            console.error('Error fetching with relation:', error);
            throw error;
        }
    }
    
}

module.exports = ProductDao;
