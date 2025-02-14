const SuperDao = require('./SuperDao');
const { Op } = require('sequelize');
const models = require('../models');

const Product = models.shop_products;

class ProductDao extends SuperDao {
    constructor() {
        super(Product);       
    } 
    
    // async fetchProductDetails(productId) {
    //     try {                               
    //         const results = await Product.findById(productId);    
    //         console.log(results);        
    //         return results;           
    //     } catch (error) {
    //         console.error('Error fetching with relation:', error);
    //         throw error;
    //     }
    // }
    
}

module.exports = ProductDao;
