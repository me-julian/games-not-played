exports.getEncryptedUsers = async () => {
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
    const userData = [
        {
            username: 'julian',
            password: 'password',
            salt: crypto.randomBytes(16),
        },
        {
            username: 'lodewijk',
            password: 'bonaparte',
            salt: crypto.randomBytes(16),
        },
        {
            username: 'peter',
            password: 'kreeft',
            salt: crypto.randomBytes(16),
        },
    ]

    const users = []
    for (let user of userData) {
        users.push({
            username: user.username,
            salt: user.salt,
            hashedPassword: await hashPassword(user.password, user.salt),
            createdAt: new Date(),
            updatedAt: new Date(),
        })
    }

    return users
}
exports.games = [
    {
        id: 1,
        name: 'Europa Universalis IV',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        name: 'Crusader Kings 2',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 3,
        name: 'The Elder Scrolls III: Morrowind',
        playtime: 44,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 4,
        name: 'Stronghold: Crusader HD',
        playtime: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 5,
        name: 'Yakuza 0',
        playtime: 31,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
]
exports.entries = [
    [
        // Julian's Entries
        {
            gameId: 1,
            customOrder: 0,
            isStarred: false,
            isOwned: false,
            isPlaying: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
        {
            gameId: 2,
            customOrder: 1,
            isStarred: false,
            isOwned: false,
            isPlaying: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
        {
            gameId: 3,
            customOrder: 2,
            isStarred: false,
            isOwned: false,
            isPlaying: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
    ],
    // Lodewijk's Entries
    [
        {
            gameId: 1,
            customOrder: 0,
            isStarred: false,
            isOwned: false,
            isPlaying: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
        {
            gameId: 2,
            customOrder: 1,
            isStarred: false,
            isOwned: false,
            isPlaying: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
        {
            gameId: 3,
            customOrder: 2,
            isStarred: false,
            isOwned: false,
            isPlaying: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
        {
            gameId: 4,
            customOrder: 3,
            isStarred: false,
            isOwned: false,
            isPlaying: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
        {
            gameId: 5,
            customOrder: 4,
            isStarred: false,
            isOwned: false,
            isPlaying: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
    ],
    // Peter's Entries
    [
        {
            gameId: 5,
            customOrder: 0,
            isStarred: false,
            isOwned: false,
            isPlaying: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
        {
            gameId: 3,
            customOrder: 1,
            isStarred: false,
            isOwned: false,
            isPlaying: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
    ],
]
