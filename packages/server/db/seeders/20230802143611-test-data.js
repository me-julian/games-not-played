'use strict'
const testData = require('./data/testData')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const firstId = await queryInterface.bulkInsert(
            'Users',
            await testData.getEncryptedUsers(),
            {
                validation: true,
            }
        )
        await queryInterface.bulkInsert('Games', testData.games, {
            validation: true,
        })

        // Add auto-incremented userId to each set of user's entries
        const entriesWithId = testData.entries.map((userEntries, userIndex) =>
            userEntries.map((entry) => {
                return { userId: firstId + userIndex, ...entry }
            })
        )
        await queryInterface.bulkInsert('Entries', entriesWithId.flat(), {
            validation: true,
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users')
        await queryInterface.bulkDelete('Games')
        await queryInterface.bulkDelete('Entries')
    },
}
