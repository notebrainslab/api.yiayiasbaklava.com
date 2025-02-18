const SuperDao = require('./SuperDao');
const { Op, Sequelize } = require('sequelize');
const models = require('../models');

const Order = models.shop_orders;
const Product = models.shop_products;

class OrderDao extends SuperDao {
    constructor() {
        super(Order, Product);       
    } 
    
    async fetchOrdersWithTotalAmount(userId) {
        try {   
            const results = await Order.findAll({
                where: { shop_customer_id : userId},
                include: {
                    model: Product,
                    through: { attributes: [] }, // Hide the join table
                    attributes: ['id', 'name', 'price']
                },
                attributes: [
                    'id',
                    'number',
                    'status',
                    'created_at',
                    'updated_at',
                    [Sequelize.literal('(SELECT SUM(qty * unit_price) FROM shop_order_items WHERE shop_order_items.shop_order_id = shop_orders.id)'), 'total_amount']
                ],
                order: [['id', 'DESC']]             
            });
            
            return results;           
        } catch (error) {
            console.error('Error fetching with relation:', error);
            throw error;
        }
    }
    
}

module.exports = OrderDao;
