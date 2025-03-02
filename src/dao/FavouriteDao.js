const SuperDao = require('./SuperDao');
const { Op, Sequelize } = require('sequelize');
const models = require('../models');
require('dotenv').config();

const IMAGE_URL = process.env.IMAGE_URL 

const Favourite = models.favourites;
const Product = models.shop_products;
const Media = models.media;

class FavouriteDao extends SuperDao {
    constructor() {
        super(Favourite, Product);       
    } 
    
    // async fetchFavouriteProducts(userId) {
    //     try {   
    //         const results = Favourite.findAll({
    //             where: { shop_customer_id : userId},                
    //             include: [
    //                 {
    //                     model: Product,
    //                     attributes: ['id', 'name'],
    //                     include: [
    //                         {
    //                             model: Media,
    //                             as: 'images', // Match the alias defined in Product model
    //                             attributes: ['model_id', 'file_name', 'collection_name'],
    //                             required: false, // Allow products without images
    //                             where: { model_type: 'App\\Models\\Shop\\Product' }, // Ensure it's for products
    //                         },
    //                     ],
    //                 }
    //             ],
    //             attributes: [],
    //         });
            
    //         return results;
            
    //     } catch (error) {
    //         console.error('Error fetching with relation:', error);
    //         throw error;
    //     }
    // }
    
    async fetchFavouriteProducts(userId) {
        try {   
            const results = await Favourite.findAll({
                where: { shop_customer_id: userId },                
                include: [
                    {
                        model: Product,
                        attributes: ['id', 'name'],
                        include: [
                            {
                                model: Media,
                                as: 'images',
                                attributes: ['file_name', 'collection_name'], // Removed model_id since it's not needed for URL
                                required: false,
                                where: { model_type: 'App\\Models\\Shop\\Product' },
                            },
                        ],
                    }
                ],
                attributes: [], 
            });
                
            if (!results || results.length === 0) {
                return { status: 0, message: "No favorite products found!", data: [] };
            }
    
            // Transform data safely
            const transformedResults = results.map(fav => {
                if (!fav.shop_product) {
                    return null; // Skip if shop_product is missing
                }
    
                const product = fav.shop_product;
                const imagesArray = Array.isArray(product.images) ? product.images : [];
    
                return {
                    shop_product: {
                        id: product.id || null,
                        name: product.name || "Unknown Product",
                        images: imagesArray.map(image => ({
                            url: `${IMAGE_URL}/storage/${image.collection_name}/${image.file_name}`,
                            collection: image.collection_name
                        }))
                    }
                };
            }).filter(Boolean); // Remove null values
                
            return { status: 1, message: "Data fetched successfully!", data: transformedResults };
    
        } catch (error) {
            console.error('Error fetching with relation:', error);
            throw error;
        }
    }
                
}

module.exports = FavouriteDao;
