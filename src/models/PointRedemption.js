const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PointRedemption extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
          PointRedemption.belongsTo(models.shop_orders, { foreignKey: 'order_id' });
            // define association here
            // User.belongsTo(models.agency, { foreignKey: 'agency_id', targetKey: 'id' });
        }
    }

    PointRedemption.init(
        {
          id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
          },
          order_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
          },
          point: {
            type: DataTypes.BIGINT,
            allowNull: false,
          },
          name: {
            type: DataTypes.STRING(255),
            allowNull: false,
          },
          status: {
            type: DataTypes.TINYINT,
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
        },
        {
          sequelize,
          modelName: 'point_redemptions',
        //   tableName: 'point_redemptions',
          underscored: true,
          timestamps: true,
        }
      )
    
    return PointRedemption;
};
