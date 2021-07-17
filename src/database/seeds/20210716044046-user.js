'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Users', [{
        email: 'userone@test.com',
        name: 'I am User One',
        password: '#hashtag',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
