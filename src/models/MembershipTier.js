const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class MembershipTier extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Point.belongsTo(models.shop_orders, { foreignKey: 'order_id' });
            // define association here
            // User.belongsTo(models.agency, { foreignKey: 'agency_id', targetKey: 'id' });
        }
    }

    MembershipTier.init(
        {
          id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
          },
          name: {
            type: DataTypes.STRING(255),
            allowNull: true,
          },
          image: {
            type: DataTypes.STRING(255),
            allowNull: true,
          },
          minimum_credit_amount: {
            type: DataTypes.DOUBLE,
            allowNull: true,
          },
          points: {
            type: DataTypes.STRING(255),
            allowNull: true,
          },
          background_color: {
            type: DataTypes.STRING(255),
            allowNull: true,
          },
          description: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          features: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
          },
          status: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1,
          },
          is_default: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,
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
          modelName: 'membership_tiers',
        //   tableName: 'membership_tiers',
          underscored: true,
          timestamps: true,
        }
    );
      
    
    return MembershipTier;
};
