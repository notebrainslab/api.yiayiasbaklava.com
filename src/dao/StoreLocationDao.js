const SuperDao = require('./SuperDao');
const { Op, Sequelize } = require('sequelize');
const models = require('../models');

const StoreLocation = models.store_locators;

class StoreLocationDao extends SuperDao {
    constructor() {
        super(StoreLocation);       
    } 
        
}

module.exports = StoreLocationDao;
