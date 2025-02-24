const SuperDao = require('./SuperDao');
const { Op, Sequelize } = require('sequelize');
const models = require('../models');

const Point = models.points;
const Order = models.shop_orders;
const PointRedemption = models.point_redemptions;

class PointDao extends SuperDao {
    constructor() {
        super(Point, Order);       
    } 
    
    async fetchPointHistoryThroughOrder(userId) {
        try {   
            
            const points = await Point.findAll({
                include: {
                    model: Order,
                    where: { shop_customer_id: userId },
                    attributes: [] // Exclude order details from the response
                },
                attributes: [
                    'id',                    
                    'point', 
                    'created_at',
                    [Sequelize.literal(`'Credit'`), 'type'] // Add type column
                ]
            });

            const redemptions = await PointRedemption.findAll({
                include: {
                    model: Order,
                    where: { shop_customer_id: userId },
                    attributes: []
                },
                attributes: [
                    'id',                     
                    'point', 
                    'created_at',
                    [Sequelize.literal(`'Debit'`), 'type']
                ]
            });
            
            // Combine and sort by created_at DESC
            const results = [...points, ...redemptions].sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at) // Sort latest first
            );
            
            return results;   
        } catch (error) {
            console.error('Error fetching with relation:', error);
            throw error;
        }
    }

    async fetchCurrentPoints(userId) {
        try {   
            const result = await Order.findAll({
                attributes: [
                  [Sequelize.fn('COALESCE', Sequelize.fn('SUM', Sequelize.col('points.point')), 0), 'total_points_earned'],
                  [Sequelize.fn('COALESCE', Sequelize.fn('SUM', Sequelize.col('point_redemptions.point')), 0), 'total_points_redeemed'],
                  [Sequelize.literal('COALESCE(SUM(`points`.`point`), 0) - COALESCE(SUM(`point_redemptions`.`point`), 0)'), 'current_points']
                ],
                include: [
                  {
                    model: Point,
                    attributes: [],
                    required: false,
                  },
                  {
                    model: PointRedemption,
                    attributes: [],
                    required: false,                    
                  }
                ],
                where: {
                  shop_customer_id: userId,
                },
                raw: true,
            });  

            if (result && result.length > 0) {
                return result[0];
            }

            return {};         
        } catch (error) {
            console.error('Error fetching with relation:', error);
            throw error;
        }
    }
    
}

module.exports = PointDao;
