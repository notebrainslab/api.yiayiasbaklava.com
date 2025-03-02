const SuperDao = require('./SuperDao');
const { Op, Sequelize } = require('sequelize');
const models = require('../models');
const moment = require('moment');
require('dotenv').config();
// const Product = require('../models/Product');

const IMAGE_URL = process.env.IMAGE_URL

const WeeklyShowcase = models.weekly_showcases;
const Product = models.shop_products;
const ProductVote = models.shop_product_votes;
const Media = models.media;

class WeeklyShowcaseDao extends SuperDao {
    constructor() {
        super(WeeklyShowcase, Product);        
    } 
    
    // async fetchWithRelation(whereCondition) {
    //     try {
    //         const results = await WeeklyShowcase.findAll({
    //             where: whereCondition,               
    //         });

    //         let productIds = [];
    //         let classicProductIds = [];
            
    //         results.forEach(result => {
    //             productIds = [...productIds, ...JSON.parse(result.product_ids)];
    //             classicProductIds = [...classicProductIds, ...JSON.parse(result.classic_product_ids || '[]')];
    //         });
             
    //         const products = await Product.findAll({
    //             where: { id: { [Op.in]: productIds } },
    //             attributes: ['id', 'name', 'price'],                
    //         });

    //         const classicProducts = await Product.findAll({
    //             where: { id: { [Op.in]: classicProductIds } },
    //             attributes: ['id', 'name', 'price'],                
    //         });

    //         // return results.map(result => ({
    //         //     id: result.id,               
    //         //     weekly_products: products
    //         //         .filter(p => JSON.parse(result.product_ids).includes(String(p.id)))
    //         //         .map(product => ({
    //         //             ...product.get(),
    //         //             images: product.images?.map(img => ({
    //         //                 id: img.id,
    //         //                 url: `/storage/${img.file_name}`,  // Adjust path based on storage logic
    //         //                 collection: img.collection_name,
    //         //             })) || [],
    //         //         })),
    //         //     classic_products: classicProducts
    //         //         .filter(cp => JSON.parse(result.classic_product_ids || '[]').includes(String(cp.id)))
    //         //         .map(classicProduct => ({
    //         //             ...classicProduct.get(),
    //         //             images: classicProduct.images?.map(img => ({
    //         //                 id: img.id,
    //         //                 url: `/storage/${img.file_name}`,  // Adjust path based on storage logic
    //         //                 collection: img.collection_name,
    //         //             })) || [],
    //         //         })),
    //         // }));
    

    //         return results.map(result => ({
    //             id: result.id,  

    //             weekly_products: products.filter(p => JSON.parse(result.product_ids).includes(String(p.id))),
    //             classic_products: classicProducts.filter(cp => JSON.parse(result.classic_product_ids || '[]').includes(String(cp.id)))
    //         }));

    //     } catch (error) {
    //         console.error('Error fetching with relation:', error);
    //         throw error;
    //     }
    // }

    async fetchWithRelation(whereCondition)  {
        try {
            const results = await WeeklyShowcase.findAll({ where: whereCondition });
    
            let allProductIds = new Set();
            
            results.forEach(result => {
                JSON.parse(result.product_ids).forEach(id => allProductIds.add(id));
                JSON.parse(result.classic_product_ids || '[]').forEach(id => allProductIds.add(id));
            });
    
            const products = await Product.findAll({
                where: { id: { [Op.in]: Array.from(allProductIds) } },
                attributes: [['id', 'product_id'], 'name', 'price'],  // Renaming id to product_id
            });
    
            const media = await Media.findAll({
                where: { model_id: { [Op.in]: Array.from(allProductIds) } },
                attributes: ['model_id', 'file_name', 'collection_name'],
            });
    
            // Convert media array into a map for quick lookup
            const mediaMap = media.reduce((acc, img) => {
                if (!acc[img.model_id]) acc[img.model_id] = [];
                acc[img.model_id].push({
                    url: `${IMAGE_URL}/storage/${img.collection_name}/${img.file_name}`, // Adjust path based on storage logic
                    collection: img.collection_name,
                });
                return acc;
            }, {});
    
            // Merge images with products
            // const productMap = products.map(product => ({
            //     ...product.get(),
            //     images: mediaMap[product.product_id] || [],  // Attach images if available
            // }));

            const productMap = products.map(product => {
                const productData = product.dataValues || product;  // Extract dataValues if exists
                return {
                    ...productData,
                    images: mediaMap[String(productData.product_id)] || [],  // Convert to string for consistency
                };
            });

            return results.map(result => ({
                id: result.id,
                weekly_products: productMap.filter(p => JSON.parse(result.product_ids).includes(String(p.product_id))),
                classic_products: productMap.filter(cp => JSON.parse(result.classic_product_ids || '[]').includes(String(cp.product_id))),
            }));
    
        } catch (error) {
            console.error('Error fetching with relation:', error);
            throw error;
        }
    };
    
    
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
