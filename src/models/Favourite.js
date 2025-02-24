const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Favourite extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Favourite.belongsTo(models.shop_products, { 
                foreignKey: 'shop_product_id', 
                targetKey: 'id' 
            });
            // define association here
            // User.belongsTo(models.agency, { foreignKey: 'agency_id', targetKey: 'id' });
        }
    }

    Favourite.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            shop_customer_id: {
                type: DataTypes.BIGINT,
                allowNull: true,               
            },
            shop_product_id: {
                type: DataTypes.BIGINT,
                allowNull: true,               
            },
            status: {
                type: DataTypes.TINYINT,
                allowNull: false,
                defaultValue: 1,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'created_at',
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'updated_at',
            },
            deletedAt: {
                type: DataTypes.DATE,
                field: 'deleted_at', // ✅ Enables soft delete
            },
        },
        {
            sequelize,
            modelName: 'favourites',
            // tableName: 'favourites',
            paranoid: true, // Enables soft delete
            underscored: true,
            timestamps: true, // Automatically adds createdAt & updatedAt
        }
    );

    return Favourite;
};
