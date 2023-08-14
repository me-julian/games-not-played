'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addIndex('Entries', ['userId', 'gameId'], {
            name: 'unique-entry-index',
            unique: true,
        })
        await queryInterface.addIndex('Entries', ['customOrder', 'userId'], {
            name: 'unique-order-index',
            unique: true,
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeIndex('Entries', 'unique-entry-index')
        await queryInterface.removeIndex('Entries', 'unique-order-index')
    },
}
