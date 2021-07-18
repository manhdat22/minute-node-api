'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'repositories',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          user_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
          },
          name: {
            allowNull: false,
            unique: true,
            type: Sequelize.STRING,
          },
          url: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          username: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          password: {
            allowNull: false,
            type: Sequelize.STRING,
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
      await queryInterface.addIndex('repositories', ['user_id'], {
        transaction,
      })

      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('repositories')
  },
}
