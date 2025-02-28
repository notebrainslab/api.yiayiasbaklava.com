const SuperDao = require('./SuperDao');
const { Op } = require('sequelize');
const models = require('../models');

const Category = models.shop_categories;
const Product = models.shop_products;

class CategoryDao extends SuperDao {
    constructor() {
        super(Category, Product);       
    } 
    
    async fetchCategoryWithProductRelation() {
        try {

            const results = await Category.findAll({
                attributes: ['id', 'name', 'slug','description'],
                include: {
                    model: Product,
                    through: { attributes: [] }, // Hide the join table
                    attributes: ['id', 'name', 'slug', 'price', 'qty', 'description']
                },
                order: [['name', 'ASC']]             
            });

            if (!results.length) {
                return { message: 'No categories found!' };
            }

            return results;           
        } catch (error) {
            console.error('Error fetching with relation:', error);
            throw error;
        }
    }
    
}

module.exports = CategoryDao;
