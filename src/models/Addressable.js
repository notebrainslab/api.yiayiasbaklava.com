const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Addressable extends Model {
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

    Addressable.init(
        {
            address_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'addresses', // Name of the table
                    key: 'id',
                },
                onDelete: 'CASCADE',
                primaryKey: true,
            },
            addressable_type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            addressable_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'addressables',
            // tableName: 'addressables',
            underscored: true,
            timestamps: false, // Since the table doesn't have `created_at` and `updated_at`
        }
    );
    

    return Addressable;
};
