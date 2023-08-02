'use strict'
const crypto = require('crypto')

function hashPassword(password, salt) {
    return new Promise((resolve) => {
        crypto.pbkdf2(
            password,
            salt,
            310000,
            32,
            'sha256',
            function (err, hashedPassword) {
                if (err) {
                    console.error(err)
                }

                resolve(hashedPassword)
            }
        )
    })
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const users = [
            {
                username: 'julian',
                password: 'password',
                salt: crypto.randomBytes(16),
            },
            {
                username: 'peter',
                password: 'kreeft',
                salt: crypto.randomBytes(16),
            },
        ]

        const encryptedUsers = [
            {
                username: users[0].username,
                salt: users[0].salt,
                hashedPassword: await hashPassword(
                    users[0].password,
                    users[0].salt
                ),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                username: users[1].username,
                salt: users[1].salt,
                hashedPassword: await hashPassword(
                    users[1].password,
                    users[1].salt
                ),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]

        await queryInterface.bulkInsert('Users', encryptedUsers, {
            validation: true,
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', [
            {
                username: { [Sequelize.Op.in]: ['julian', 'peter'] },
            },
        ])
    },
}
