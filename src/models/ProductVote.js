const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ProductVote extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            ProductVote.belongsTo(models.shop_products, { 
                foreignKey: 'product_id', 
                targetKey: 'id' 
              });
            // define association here
            // User.belongsTo(models.agency, { foreignKey: 'agency_id', targetKey: 'id' });
        }
    }

    ProductVote.init(
        {
            customer_id: {
              type: DataTypes.BIGINT.UNSIGNED,
              allowNull: false,
            },
            product_id: {
              type: DataTypes.BIGINT.UNSIGNED,
              allowNull: false,
            },
            weekly_showcase_id: {
              type: DataTypes.BIGINT,
              allowNull: true,
            },
            status: {
              type: DataTypes.TINYINT,
              allowNull: false,
              defaultValue: 1,
            },
            deletedAt: {
              type: DataTypes.DATE,
              field: 'deleted_at',
            },
        },
        {
            sequelize,
            modelName: 'shop_product_votes',            
            paranoid: true,
            underscored: true,
            timestamps: true,
        }
    );

    return ProductVote;
};
