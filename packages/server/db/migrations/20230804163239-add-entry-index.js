'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addIndex('BacklogEntries', ['userId', 'gameId'], {
            name: 'entry-index',
            unique: true,
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeIndex('BacklogEntries', 'entry-index')
    },
}
