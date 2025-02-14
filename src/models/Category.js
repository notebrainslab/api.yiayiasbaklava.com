const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Category.belongsToMany(models.shop_products, { 
                through: 'shop_category_product', 
                foreignKey: 'shop_category_id', 
                otherKey: 'shop_product_id'
            });
            // define association here
            // User.belongsTo(models.agency, { foreignKey: 'agency_id', targetKey: 'id' });
        }
    }

    Category.init(
        {                 
            parent_id: { type: DataTypes.BIGINT },           
            name: { type: DataTypes.STRING },
            slug: { type: DataTypes.STRING },
            description: { 
                type: DataTypes.TEXT,                
            },
            position: { type: DataTypes.SMALLINT.UNSIGNED, defaultValue: 0 },
            is_visible: { type: DataTypes.BOOLEAN, defaultValue: false },
            seo_title: { type: DataTypes.STRING },
            seo_description: { type: DataTypes.STRING },                                          
        },
        {
            sequelize,
            modelName: 'shop_categories',            
            underscored: true,
            timestamps: true,
        },
    );

    return Category;
};
