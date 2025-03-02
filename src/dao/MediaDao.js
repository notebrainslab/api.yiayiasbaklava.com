const SuperDao = require('./SuperDao');
const { Op, Sequelize } = require('sequelize');
const models = require('../models');
require('dotenv').config();

const IMAGE_URL = process.env.IMAGE_URL

const Media = models.media;

class MediaDao extends SuperDao {
    constructor() {
        super(Media);       
    }   
    
    async fetchImages(product_id, model_type) {
        try {   
            const results  = await Media.findOne({
                where: { model_id: product_id, model_type: model_type },
                attributes: ['collection_name', 'file_name']              
            });
                       
            return results
            ? [{
                url: `${IMAGE_URL}/storage/${results.collection_name}/${results.file_name}`,
                collection: results.collection_name
            }]
            : [];

        } catch (error) {
            console.error('Error fetching with relation:', error);
            throw error;
        }
    }
}

module.exports = MediaDao;
