const SuperDao = require('./SuperDao');
const { Op, Sequelize } = require('sequelize');
const models = require('../models');

const MasterSetting = models.mastersettings;

class MasterSettingDao extends SuperDao {
    constructor() {
        super(MasterSetting);       
    }  
    
    async fetchMasterSettingsData() {
        return MasterSetting.findOne({ 
            order: [['updated_at', 'DESC']]    
        });
    }
}

module.exports = MasterSettingDao;
