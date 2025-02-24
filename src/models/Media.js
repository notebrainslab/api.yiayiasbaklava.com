const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Media extends Model {
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

    Media.init(
        {     
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            model_type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            model_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: false
            },
            uuid: {
                type: DataTypes.CHAR(36),
                allowNull: true
            },
            collection_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            file_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            mime_type: {
                type: DataTypes.STRING,
                allowNull: true
            },
            disk: {
                type: DataTypes.STRING,
                allowNull: false
            },
            conversions_disk: {
                type: DataTypes.STRING,
                allowNull: true
            },
            size: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: false
            },
            manipulations: {
                type: DataTypes.JSON,
                allowNull: false
            },
            custom_properties: {
                type: DataTypes.JSON,
                allowNull: false
            },
            generated_conversions: {
                type: DataTypes.JSON,
                allowNull: false
            },
            responsive_images: {
                type: DataTypes.JSON,
                allowNull: false
            },
            order_column: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: true
            },
            createdAt: {
                type: DataTypes.DATE,
                field: 'created_at'
            },
            updatedAt: {
                type: DataTypes.DATE,
                field: 'updated_at'
            },            
        },
        {
            sequelize,
            modelName: 'media',
            // tableName: 'media', // Explicitly define table name           
            underscored: true, // Uses snake_case for timestamps
            timestamps: true,  // Enables createdAt, updatedAt
        }
    );

    return Media;
};
