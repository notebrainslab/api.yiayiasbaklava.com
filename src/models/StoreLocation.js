const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class StoreLocation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {                                  
            // define association here
            // User.belongsTo(models.agency, { foreignKey: 'agency_id', targetKey: 'id' });
        }
    }

    StoreLocation.init(
        {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            image: {
                type: DataTypes.STRING,
            },
            name: {
                type: DataTypes.STRING,
            },
            address: {
                type: DataTypes.STRING,
            },
            phone: {
                type: DataTypes.STRING,
            },
            latitude: {
                type: DataTypes.STRING,
            },
            longitude: {
                type: DataTypes.STRING,
            },
            shop_type: {
                type: DataTypes.STRING,
            },
            status: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
            },
            created_at: {
                type: DataTypes.DATE,
            },
            updated_at: {
                type: DataTypes.DATE,
            },
            deleted_at: {
                type: DataTypes.STRING, // Match VARCHAR type from DB
            },
        },
        {
            sequelize,
            modelName: 'store_locators',           
            underscored: true,
            timestamps: true,
            paranoid: true,
            deletedAt: 'deleted_at',
        }
    );
    
    return StoreLocation;
};
