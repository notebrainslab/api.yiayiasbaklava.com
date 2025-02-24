const SuperDao = require('./SuperDao');
const { Op, Sequelize } = require('sequelize');
const models = require('../models');

const Favourite = models.favourites;
const Product = models.shop_products;

class FavouriteDao extends SuperDao {
    constructor() {
        super(Favourite, Product);       
    } 
    
    async fetchFavouriteProducts(userId) {
        try {   
            const results = Favourite.findAll({
                where: { shop_customer_id : userId},                
                include: [
                    {
                        model: Product,
                        attributes: ['id', 'name'],
                    }
                ],
                attributes: [],
            });
            
            return results;
            
        } catch (error) {
            console.error('Error fetching with relation:', error);
            throw error;
        }
    }
        
}

module.exports = FavouriteDao;
