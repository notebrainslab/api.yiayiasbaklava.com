const SuperDao = require('./SuperDao');
const { Op, Sequelize } = require('sequelize');
const models = require('../models');

require('dotenv').config();

const IMAGE_URL = process.env.IMAGE_URL

const Cart = models.shop_add_to_carts;
const Product = models.shop_products;
const Media = models.media;

class CartDao extends SuperDao {
    constructor() {
        super(Cart, Product);       
    } 
    
    async getProductPriceByProductId(productId) {
        try {   
            let result = await Product.findByPk(productId, {
                attributes: ['price']
            });

            if(!result)
            {
                result = { price: "0" };
            }
                        
            return result;           
        } catch (error) {
            console.error('Error fetching with relation:', error);
            throw error;
        }
    }

    async iskProductExists(userId, productId) {
        try {              
            return Cart.count({ where: { shop_customer_id : userId, shop_product_id: productId} }).then((count) => {
                if (count > 0) {
                    return true;
                }
                return false;
            });                                                                
        } catch (error) {
            console.error('Error fetching with relation:', error);
            throw error;
        }
    }

    async isValidCustomerC(userId, cardId) {
        try {              
            return Cart.count({ where: { shop_customer_id : userId, id: cardId} }).then((count) => {
                if (count == 0) {
                    return true;
                }
                return false;
            });                                                                
        } catch (error) {
            console.error('Error fetching with relation:', error);
            throw error;
        }
    }

    // async getCartDetails(userId) {
    //     try {  
    //         const results = await Cart.findAll({
    //             where: {
    //                 shop_customer_id: userId,
    //             },
    //             attributes: [
    //               'id',                  
    //               'quantity',                  
    //               [Sequelize.col('shop_add_to_carts.price'), 'price'], // Explicit table
    //               [Sequelize.literal('`shop_add_to_carts`.`price` * `shop_add_to_carts`.`quantity`'), 'total_price']
    //             ],
    //             include: [
    //               {
    //                 model: Product,
    //                 attributes: ['id', 'name'],
    //                 include: [
    //                     {
    //                         model: Media,
    //                         as: 'images', // Match the alias defined in Product model
    //                         attributes: ['file_name', 'collection_name'],
    //                         required: false, // Allow products without images
    //                         where: { model_type: 'App\\Models\\Shop\\Product' }, // Ensure it's for products
    //                     },
    //                 ],
    //               }
    //             ]
    //         });

    //         const cartWithImages = results.map(cart => {
    //             let cartItem = cart.toJSON(); 
                
    //             // Ensure images are formatted properly
    //             if (cartItem.Product && cartItem.Product.images) {
    //                 cartItem.Product.images = cartItem.Product.images.map(image => ({
    //                     url: `https://yiayiasbaklava.notebrains.com/storage/product-images/${image.file_name}`,
    //                     collection: image.collection_name
    //                 }));
    //             }
    
    //             return cartItem;
    //         });
                 
    //         return cartWithImages;           
    //     } catch (error) {
    //         console.error('Error fetching with relation:', error);
    //         throw error;
    //     }
    // }

    async getCartDetails(userId) {
        try {  
            const results = await Cart.findAll({
                where: {
                    shop_customer_id: userId,
                },
                attributes: [
                    'id',                  
                    'quantity',                  
                    [Sequelize.col('shop_add_to_carts.price'), 'price'], 
                    [Sequelize.literal('`shop_add_to_carts`.`price` * `shop_add_to_carts`.`quantity`'), 'total_price']
                ],
                include: [
                    {
                        model: Product,
                        as: 'shop_product', // Use the alias matching your API response
                        attributes: ['id', 'name'],
                        include: [
                            {
                                model: Media,
                                as: 'images', 
                                attributes: ['id','file_name', 'collection_name'],
                                required: false, 
                                where: { model_type: 'App\\Models\\Shop\\Product' },
                            },
                        ],
                    }
                ]
            });
    
            const cartWithImages = results.map(cart => {
                let cartItem = cart.toJSON(); 
                
                // Ensure images are formatted properly
                if (cartItem.shop_product && cartItem.shop_product.images) {
                    cartItem.shop_product.images = cartItem.shop_product.images.map(image => ({
                        url: `${IMAGE_URL}/storage/${image.id}/${image.file_name}`,                       
                    }));
                }
    
                return cartItem;
            });
                 
            return cartWithImages;           
        } catch (error) {
            console.error('Error fetching cart details:', error);
            throw error;
        }
    }
    
    
}

module.exports = CartDao;
