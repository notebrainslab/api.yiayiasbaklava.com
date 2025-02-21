const SuperDao = require('./SuperDao');
const { Op, Sequelize } = require('sequelize');
const models = require('../models');

const Faq = models.faqs;

class SupportDao extends SuperDao {
    constructor() {
        super(Faq);       
    }                 
}

module.exports = SupportDao;
