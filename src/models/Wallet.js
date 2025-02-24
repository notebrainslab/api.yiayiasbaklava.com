const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Wallet extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Wallet.belongsTo(models.shop_orders, { 
                foreignKey: 'order_id', 
                targetKey: 'id' 
            });
            // define association here
            // User.belongsTo(models.agency, { foreignKey: 'agency_id', targetKey: 'id' });
        }
    }

    Wallet.init(
        {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            order_id: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            amount: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            type: {
                type: DataTypes.ENUM('Debits', 'Credits'),
                allowNull: false
            },
            remarks: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            deletedAt: {
                type: DataTypes.DATE,
                field: 'deleted_at'
            }
        },
        {
            sequelize,
            modelName: 'shop_wallets',
            // tableName: 'shop_wallets',
            paranoid: true, 
            underscored: true,
            timestamps: true
        }
    );

    return Wallet;
};
