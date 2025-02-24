const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Address extends Model {
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

    Address.init(
        {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            country: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            street: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            city: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            state: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            zip: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            full_address: {
                type: DataTypes.VIRTUAL, // Virtual field (Generated in DB)
                get() {
                    return `${this.street}, ${this.zip} ${this.city}`;
                },
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
            modelName: 'addresses',
            // tableName: 'addresses',
            underscored: true,
            timestamps: true, // Enables `created_at` and `updated_at`
        }
    );

    return Address;
};
