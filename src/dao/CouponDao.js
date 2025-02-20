const SuperDao = require('./SuperDao');
const { Op, Sequelize } = require('sequelize');
const models = require('../models');

const Coupon = models.coupons;

class CouponDao extends SuperDao {
    constructor() {
        super(Coupon);       
    }
    
    async fethCoupons(membershipId) {
        try {               
            const results = await Coupon.findAll({
                where: {
                    membership_tier_id: {
                        [Op.like]: `%${membershipId}%`
                    }
                }
            });
            
            return results;        
        } catch (error) {
            console.error('Error fetching coupon:', error);
            throw error;
        }
    }
}

module.exports = CouponDao;
