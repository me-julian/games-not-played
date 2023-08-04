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
        await queryInterface.bulkDelete('Users', [
            {
                username: { [Sequelize.Op.in]: ['julian', 'peter'] },
            },
        ])
        await queryInterface.bulkDelete('Games', [
            {
                id: { [Sequelize.Op.in]: [1, 2, 3, 4, 5] },
            },
        ])
        await queryInterface.bulkDelete('Entries', [
            {
                id: { [Sequelize.Op.in]: [1, 2, 3, 4, 5] },
            },
        ])
    },
}
