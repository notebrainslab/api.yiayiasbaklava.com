const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Faq extends Model {
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

    Faq.init(
        {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            question: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            answer: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            is_active: {
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
            deletedAt: {
                type: DataTypes.DATE,
                field: 'deleted_at',
            },
        },
        {
            sequelize,
            modelName: 'faqs',
            // tableName: 'faqs',
            paranoid: true,
            underscored: true,
            timestamps: true,
        }
    );
    return Faq;
};
