const SuperDao = require('./SuperDao');
const { Op, Sequelize } = require('sequelize');
const models = require('../models');

const Order = models.shop_orders;

class OrderDao extends SuperDao {
    constructor() {
        super(Order);       
    } 
    
    async fetchOrdersWithTotalAmount(whereCondition) {
        try {            
            const results = await Order.findAll({
                attributes: [
                    'id',
                    'number',
                    'created_at',
                    [Sequelize.fn('SUM', Sequelize.literal('`shop_order_items`.`qty` * `shop_order_items`.`unit_price`')), 'total_amount']
                ],

                include: [
                    {
                        model: shop_order_items,
                        attributes: [],
                    }
                ],

                where: whereCondition,
                group: ['shop_orders.id'],                         
            });

            if (!results.length) {
                return { message: 'No Orders found!' };
            }

            return results;           
        } catch (error) {
            console.error('Error fetching with relation:', error);
            throw error;
        }
    }
    
}

module.exports = OrderDao;
