const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Product.hasMany(models.media, {
                foreignKey: "model_id",
                constraints: false,
                scope: {
                    model_type: "Product", // Only fetch media where model_type is 'Product'
                },
                as: "images", // Alias for accessing related media
            });
            // define association here
            // User.belongsTo(models.agency, { foreignKey: 'agency_id', targetKey: 'id' });
        }
    }

    Product.init(
        {     
            id: { 
                type: DataTypes.BIGINT.UNSIGNED,
                primaryKey: true,
                autoIncrement: true 
            },
            shop_brand_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
            name: { type: DataTypes.STRING, allowNull: false },           
            type_of_product: { type: DataTypes.TINYINT },
            bundle_count: { type: DataTypes.BIGINT },
            slug: { type: DataTypes.STRING },
            sku: { type: DataTypes.STRING },
            barcode: { type: DataTypes.STRING },
            description: { type: DataTypes.TEXT },
            qty: { type: DataTypes.BIGINT.UNSIGNED, defaultValue: 0 },
            security_stock: { type: DataTypes.BIGINT.UNSIGNED, defaultValue: 0 },
            featured: { type: DataTypes.BOOLEAN, defaultValue: false },
            is_visible: { type: DataTypes.BOOLEAN, defaultValue: false },
            old_price: { type: DataTypes.DECIMAL(10, 2) },
            price: { type: DataTypes.DECIMAL(10, 2) },
            cost: { type: DataTypes.DECIMAL(10, 2) },
            type: { 
                type: DataTypes.ENUM('deliverable', 'downloadable'), 
                allowNull: true 
            },
            backorder: { type: DataTypes.BOOLEAN, defaultValue: false },
            requires_shipping: { type: DataTypes.BOOLEAN, defaultValue: false },
            published_at: { type: DataTypes.DATEONLY },
            seo_title: { type: DataTypes.STRING(60) },
            seo_description: { type: DataTypes.STRING(160) },
            weight_value: { type: DataTypes.DECIMAL(10, 2).UNSIGNED, defaultValue: 0.00 },
            weight_unit: { type: DataTypes.STRING, defaultValue: 'kg' },
            height_value: { type: DataTypes.DECIMAL(10, 2).UNSIGNED, defaultValue: 0.00 },
            height_unit: { type: DataTypes.STRING, defaultValue: 'cm' },
            width_value: { type: DataTypes.DECIMAL(10, 2).UNSIGNED, defaultValue: 0.00 },
            width_unit: { type: DataTypes.STRING, defaultValue: 'cm' },
            depth_value: { type: DataTypes.DECIMAL(10, 2).UNSIGNED, defaultValue: 0.00 },
            depth_unit: { type: DataTypes.STRING, defaultValue: 'cm' },
            volume_value: { type: DataTypes.DECIMAL(10, 2).UNSIGNED, defaultValue: 0.00 },
            volume_unit: { type: DataTypes.STRING, defaultValue: 'l' },
            createdAt: { type: DataTypes.DATE },
            updatedAt: { type: DataTypes.DATE }
        },
        {
            sequelize,
            modelName: 'shop_products',
            underscored: true,
            timestamps: true,
        },
    );

    return Product;
};
