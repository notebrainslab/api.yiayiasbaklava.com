const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Point extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Point.belongsTo(models.shop_orders, { foreignKey: 'order_id' });
            // define association here
            // User.belongsTo(models.agency, { foreignKey: 'agency_id', targetKey: 'id' });
        }
    }

    Point.init(
        {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            order_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
            },
            point: {
                type: DataTypes.DOUBLE,
                allowNull: true,
            },
            note: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'points',
            tableName: 'points',
            underscored: true,
            timestamps: true,
        }
    );
    
    return Point;
};
