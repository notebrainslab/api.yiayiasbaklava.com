const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class MasterSetting extends Model {
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

    MasterSetting.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        favIcon: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'fav-icon',
        },
        copyright: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'email_address',
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'phone_number',
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        socialIcon: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'social_icon',
        },
        joiningBonus: {
            type: DataTypes.STRING(111),
            allowNull: true,
            field: 'joning_bonus',
        },
        smtpHost: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'smtp_host',
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'user_name',
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        port: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fromEmail: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'from_email',
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
    },
    {
        sequelize,
        modelName: 'mastersettings',
        // tableName: 'mastersettings',
        underscored: true,
        timestamps: true,
    });
    
    return MasterSetting;
};
