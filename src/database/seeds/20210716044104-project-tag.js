'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ProjectTags', [{
      project_id: 1,
      tag_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ProjectTags', null, {});
  }
};
