const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Coupon extends Model {
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

    Coupon.init(
        {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            code: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            membershipTierId: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'membership_tier_id', // Map to DB column
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            minCartValue: {
                type: DataTypes.DOUBLE,
                allowNull: false,
                field: 'min_cart_value',
            },
            discountType: {
                type: DataTypes.ENUM('percentage', 'fixed'),
                allowNull: false,
                field: 'discount_type',
            },
            amount: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            maxDiscount: {
                type: DataTypes.DOUBLE,
                allowNull: false,
                field: 'max_discount',
            },
            noOfTimeUsable: {
                type: DataTypes.BIGINT,
                allowNull: true,
                field: 'no_of_time_usable',
            },
            noOfTimeUsableSingleCustomer: {
                type: DataTypes.BIGINT,
                allowNull: false,
                field: 'no_of_time_usable_single_customer',
            },
            startAt: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'start_at',
            },
            expireAt: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'expire_at',
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
                field: 'deleted_at',
            },
        },
        {
            sequelize,
            modelName: 'coupons',
            // tableName: 'coupons',
            paranoid: true, // Enables soft delete
            underscored: true,
            timestamps: true, // Automatically adds createdAt & updatedAt
        }
    );


    return Coupon;
};
