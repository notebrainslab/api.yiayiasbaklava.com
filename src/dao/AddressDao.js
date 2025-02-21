const SuperDao = require('./SuperDao');
const { Op, Sequelize } = require('sequelize');
const models = require('../models');

const Address = models.addresses;
const Addressable = models.addressables;

class AddressDao extends SuperDao {
    constructor() {
        super(Address);       
    }   
    
    async SaveAddress(userId, addressBody) {
        try {   
            const newAddress  = await Address.create(addressBody);

            if (!newAddress) return false; 
            
            const addresable_type = 'App\Models\Shop\Customer';

            const addressableEntry = await Addressable.create({
                address_id: newAddress.id,
                addressable_type: addresable_type,
                addressable_id: userId, 
            });
            
            return !!addressableEntry;
        } catch (error) {
            console.error('Error fetching with relation:', error);
            throw error;
        }
    }
}

module.exports = AddressDao;
