'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'checklists',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          repository_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
          },
          type: {
            allowNull: false,
            type: Sequelize.INTEGER,
          },
          pattern: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          note: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          file: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          regex: {
            allowNull: false,
            type: Sequelize.BOOLEAN,
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
          },
        },
        { transaction },
      )
      await queryInterface.addIndex('checklists', ['repository_id'], {
        transaction,
      })

      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('checklists')
  },
}
