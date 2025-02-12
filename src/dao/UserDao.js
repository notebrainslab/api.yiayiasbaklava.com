const SuperDao = require('./SuperDao');
const models = require('../models');

const User = models.shop_customers;
// const Customer = models.customer;

class UserDao extends SuperDao {
    constructor() {
        super(User);
    }

    async findByEmail(email) {
        return User.findOne({ where: { email } });
    }

    async isEmailExists(email) {
        return User.count({ where: { email } }).then((count) => {
            if (count != 0) {
                return true;
            }
            return false;
        });
    }
    
    async createWithTransaction(user, transaction) {
        return User.create(user, { transaction });
    }

    async delete() {
        return User.findOne({ where: { email } });
    }
}

module.exports = UserDao;
