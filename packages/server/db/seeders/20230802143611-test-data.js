'use strict'
const testData = require('./data/testData')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Users',
            await testData.getEncryptedUsers(),
            {
                validation: true,
            }
        )
        await queryInterface.bulkInsert('Games', testData.games, {
            validation: true,
        })
        await queryInterface.bulkInsert('Entries', testData.entries, {
            validation: true,
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users')
        await queryInterface.bulkDelete('Games')
        await queryInterface.bulkDelete('Entries')
    },
}
