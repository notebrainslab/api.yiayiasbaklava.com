const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
          //  User.belongsTo(models.agency, { foreignKey: 'agency_id', targetKey: 'id' });
        }
    }

    Customer.init(
        {     
            uuid: DataTypes.UUID,       
            name: DataTypes.STRING,           
            email: DataTypes.STRING,
            email_verified_at: DataTypes.STRING,
            password: DataTypes.STRING,
            photo: DataTypes.STRING,
            gender: DataTypes.ENUM('male', 'female'),
            phone: DataTypes.STRING,
            birthday: DataTypes.DATE,                        
            is_active: DataTypes.TINYINT,                        
            password: DataTypes.INTEGER,                        
        },
        {
            sequelize,
            modelName: 'shop_customers',
            underscored: true,
        },
    );
    return Customer;
};
