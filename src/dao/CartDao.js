const SuperDao = require('./SuperDao');
const { Op, Sequelize } = require('sequelize');
const models = require('../models');

const Cart = models.shop_add_to_carts;
const Product = models.shop_products;

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

    async getCartDetails(userId) {
        try {  
            const results = await Cart.findAll({
                where: {
                    shop_customer_id: userId,
                },
                attributes: [
                  'id',                  
                  'quantity',                  
                  [Sequelize.col('shop_add_to_carts.price'), 'price'], // Explicit table
                  [Sequelize.literal('`shop_add_to_carts`.`price` * `shop_add_to_carts`.`quantity`'), 'total_price']
                ],
                include: [
                  {
                    model: Product,
                    attributes: ['id', 'name'],
                  }
                ]
            });
                 
            return results;           
        } catch (error) {
            console.error('Error fetching with relation:', error);
            throw error;
        }
    }
    
}

module.exports = CartDao;
