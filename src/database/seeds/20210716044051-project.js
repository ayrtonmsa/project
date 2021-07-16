'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Projects', [{
      title: 'Project One',
      description: 'This is my test',
      budget: 'Budget',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Projects', null, {});
  }
};
