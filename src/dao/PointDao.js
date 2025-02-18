const SuperDao = require('./SuperDao');
const { Op, Sequelize } = require('sequelize');
const models = require('../models');

const Point = models.points;
const Order = models.shop_orders;

class PointDao extends SuperDao {
    constructor() {
        super(Point, Order);       
    } 
    
    async fetchPointThroughOrder(userId) {
        try {   
            const results = await Point.findAll({
                attributes: ['id', 'order_id', 'point', 'note', 'created_at'],
                include: [
                    {
                        model: Order,
                        attributes: ['id', 'shop_customer_id', 'total_price', 'status'],
                        where: {
                            shop_customer_id: userId, // Filter points by user
                        },
                    },
                ],
            });
            
            return results;           
        } catch (error) {
            console.error('Error fetching with relation:', error);
            throw error;
        }
    }
    
}

module.exports = PointDao;
