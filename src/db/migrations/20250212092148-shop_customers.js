
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('shop_customers', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },  
        uuid: {
          allowNull: false,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV1,
          primaryKey: true,
        },      
        name: {
          type: Sequelize.STRING,
        },       
        email: {
          type: Sequelize.STRING,
        },
        email_verified_at: {
          type: Sequelize.STRING,
        },
        photo: {
          type: Sequelize.STRING,
          allowNull: true
        },
        gender: {
          type: Sequelize.ENUM('male', 'female'),
          allowNull: false
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: true
        },
        birthday: {
          type: Sequelize.DATE,
          allowNull: true
        },
        is_active: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: 1
        },
        password: {
          type: Sequelize.STRING,
          allowNull: true,
        },                   
    },
    {
      timestamps: true,
      paranoid: true // Enables soft deletes (deletedAt column)
    });    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('shop_customers');
  }
};
