'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addIndex('Entries', ['userId', 'gameId'], {
            name: 'unique-entry-index',
            unique: true,
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeIndex('Entries', 'unique-entry-index')
    },
}
