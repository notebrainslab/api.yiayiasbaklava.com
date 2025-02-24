const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {  
            Cart.belongsTo(models.shop_products, { foreignKey: 'shop_product_id' });                                
            // define association here
            // User.belongsTo(models.agency, { foreignKey: 'agency_id', targetKey: 'id' });
        }
    }

    Cart.init(
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
            shop_product_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
            },           
            price: {
                type: DataTypes.DECIMAL(12, 2),
                allowNull: true,
            },
            quantity: {
                type: DataTypes.BIGINT.UNSIGNED,  
                allowNull: true,              
            },            
        },
        {
            sequelize,
            modelName: 'shop_add_to_carts',                       
            timestamps: true, // Enables createdAt & updatedAt
            underscored: true,
            paranoid: true, // Enables soft deletes (deleted_at column)
        }
    );

    return Cart;
};
