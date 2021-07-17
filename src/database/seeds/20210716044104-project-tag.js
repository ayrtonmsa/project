'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ProjectTags', [{
      projectId: 1,
      tagId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ProjectTags', null, {});
  }
};
