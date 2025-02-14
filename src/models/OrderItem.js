const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrderItem extends Model {
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

    OrderItem.init(
        {     
            from_date: { type: DataTypes.DATE },
            to_date: { type: DataTypes.DATE },           
            product_ids: { type: DataTypes.TEXT },
            classic_product_ids: { type: DataTypes.TEXT },
            weekly_showcase_id: { 
                type: DataTypes.INTEGER,
                field: 'weekly_showcase_id'  // ✅ Explicitly map to the DB column
            },
            status: { type: DataTypes.BIGINT },
            deletedAt: { 
                type: DataTypes.DATE,
                field: 'deleted_at'  // ✅ Correct field name for paranoid
            }                     
        },
        {
            sequelize,
            modelName: 'weekly_showcases',
            paranoid: true, 
            underscored: true,
            timestamps: true,
        },
    );

    return OrderItem;
};
