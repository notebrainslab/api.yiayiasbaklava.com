const SuperDao = require('./SuperDao');
const { Op } = require('sequelize');
const models = require('../models');
require('dotenv').config();

const IMAGE_URL = process.env.IMAGE_URL 

const Category = models.shop_categories;
const Product = models.shop_products;
const Media = models.media;

class CategoryDao extends SuperDao {
    constructor() {
        super(Category, Product);       
    } 
    
    // async fetchCategoryWithProductRelation() {
    //     try {

    //         const results = await Category.findAll({
    //             attributes: ['id', 'name', 'slug','description'],
    //             include: {
    //                 model: Product,
    //                 through: { attributes: [] }, // Hide the join table
    //                 attributes: ['id', 'name', 'slug', 'price', 'qty', 'description']
    //             },
    //             order: [['name', 'ASC']]             
    //         });

    //         if (!results.length) {
    //             return { message: 'No categories found!' };
    //         }

    //         return results;           
    //     } catch (error) {
    //         console.error('Error fetching with relation:', error);
    //         throw error;
    //     }
    // }

    async fetchCategoryWithProductRelation() {
        try {
            const results = await Category.findAll({
                attributes: ['id', 'name', 'slug', 'description'],
                include: [
                    {
                        model: Product,
                        through: { attributes: [] }, // Hide pivot table
                        attributes: ['id', 'name', 'slug', 'price', 'qty', 'description'],
                        include: [
                            {
                                model: Media,
                                as: 'images', // Match the alias defined in Product model
                                attributes: ['model_id', 'file_name', 'collection_name'],
                                required: false, // Allow products without images
                                where: { model_type: 'App\\Models\\Shop\\Product' }, // Ensure it's for products
                            },
                        ],
                    },
                ],
                order: [['name', 'ASC']],
            });
           
            if (!results.length) {
                return { message: 'No categories found!' };
            }
    
            // Transform data to format response
            const transformedResults = results.map(category => {
                const categoryJSON = category.toJSON(); // Convert category to plain object
            
                categoryJSON.shop_products = categoryJSON.shop_products.map(product => {
                    return {
                        ...product,
                        images: product.images.map(image => ({
                            url: `${IMAGE_URL}/storage/${image.collection_name}/${image.file_name}`,
                            collection: image.collection_name
                        }))
                    };
                });
            
                return categoryJSON;
            });
    
            return transformedResults;
        } catch (error) {
            console.error('Error fetching with relation:', error);
            throw error;
        }
    }
    
}

module.exports = CategoryDao;
