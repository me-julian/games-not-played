'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Entries', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            gameId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Games',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            order: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            isStarred: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
            isOwned: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
            isPlaying: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            deletedAt: {
                type: Sequelize.DATE,
            },
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Entries')
    },
}
