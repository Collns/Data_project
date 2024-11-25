module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('Customers', 'password', {
          type: Sequelize.STRING,
          allowNull: false,
      });
      await queryInterface.addColumn('Customers', 'role', {
          type: Sequelize.ENUM('user', 'admin'),
          allowNull: false,
          defaultValue: 'user',
      });
  },
  down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('Customers', 'password');
      await queryInterface.removeColumn('Customers', 'role');
  },
};
