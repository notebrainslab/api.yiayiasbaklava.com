const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {            
            Order.hasMany(models.shop_order_items, {
                foreignKey: 'order_id',
                as: 'order_items'
            });
            // define association here
            // User.belongsTo(models.agency, { foreignKey: 'agency_id', targetKey: 'id' });
        }
    }

    Order.init(
        {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            shop_customer_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
            },
            number: {
                type: DataTypes.STRING(32),
                allowNull: false,
            },
            total_price: {
                type: DataTypes.DECIMAL(12, 2),
                allowNull: true,
            },
            status: {
                type: DataTypes.ENUM('new', 'processing', 'shipped', 'delivered', 'cancelled'),
                allowNull: false,
                defaultValue: 'new',
            },
            currency: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            shipping_price: {
                type: DataTypes.DECIMAL(8, 2),
                allowNull: true,
            },
            shipping_method: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            notes: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            review_at: {
                type: DataTypes.DATEONLY, // For date without time
                allowNull: true,
            },
            ratings: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            review: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            review_status: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            deleted_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'shop_orders',           
            underscored: true, // Converts camelCase to snake_case in DB
            timestamps: true, // Enables createdAt & updatedAt
            paranoid: true, // Enables soft deletes (deleted_at column)
        }
    );

    return Order;
};
