const SuperDao = require('./SuperDao');
const { Op, Sequelize } = require('sequelize');
const models = require('../models');

const MembershipTier = models.membership_tiers;

class MembershipTierDao extends SuperDao {
    constructor() {
        super(MembershipTier)    
    }        
}

module.exports = MembershipTierDao;
