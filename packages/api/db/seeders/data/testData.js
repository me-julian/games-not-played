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
        id: 492,
        name: 'Yakuza 0',
        playtime: 8,
        backgroundImage:
            'https://media.rawg.io/media/games/ca1/ca16da30f86d8f4d36261de45fb35430.jpg',
        createdAt: '2023-08-23 19:34:02',
        updatedAt: '2023-08-23 19:34:02',
    },
    {
        id: 624,
        name: 'FTL: Faster Than Light',
        playtime: 6,
        backgroundImage:
            'https://media.rawg.io/media/games/5f4/5f4780690dbf04900cbac5f05b9305f3.jpg',
        createdAt: '2023-08-23 19:33:38',
        updatedAt: '2023-08-23 19:33:38',
    },
    {
        id: 5538,
        name: 'Dark Souls',
        playtime: 48,
        backgroundImage:
            'https://media.rawg.io/media/games/582/582b5518a52f5086d15dde128264b94d.jpg',
        createdAt: '2023-08-23 14:50:09',
        updatedAt: '2023-08-23 14:50:09',
    },
    {
        id: 10037,
        name: 'Europa Universalis IV',
        playtime: 6,
        backgroundImage:
            'https://media.rawg.io/media/games/eff/eff7b309ae98c32b48f22a10e7523106.jpg',
        createdAt: '2023-08-23 19:32:51',
        updatedAt: '2023-08-23 19:32:51',
    },
    {
        id: 10340,
        name: 'Crusader Kings II',
        playtime: 3,
        backgroundImage:
            'https://media.rawg.io/media/games/c22/c22d804ac753c72f2617b3708a625dec.jpg',
        createdAt: '2023-08-23 19:33:25',
        updatedAt: '2023-08-23 19:33:25',
    },
    {
        id: 10926,
        name: 'Factorio',
        playtime: 19,
        backgroundImage:
            'https://media.rawg.io/media/games/7e4/7e4e22b76da131e9690d5757555093c2.jpg',
        createdAt: '2023-08-23 19:34:17',
        updatedAt: '2023-08-23 19:34:17',
    },
    {
        id: 13820,
        name: 'The Elder Scrolls III: Morrowind',
        playtime: 2,
        backgroundImage:
            'https://media.rawg.io/media/games/ccf/ccf26f6e3d553a04f0033a8107a521b8.jpg',
        createdAt: '2023-08-23 19:33:50',
        updatedAt: '2023-08-23 19:33:50',
    },
    {
        id: 19418,
        name: 'Europa Universalis: Rome - Gold Edition',
        playtime: 1,
        backgroundImage:
            'https://media.rawg.io/media/screenshots/587/5870e2c822e51b950ea8da529e788b82.jpg',
        createdAt: '2023-08-23 19:33:14',
        updatedAt: '2023-08-23 19:33:14',
    },
    {
        id: 31033,
        name: 'Stronghold: Crusader',
        playtime: null,
        backgroundImage:
            'https://media.rawg.io/media/games/3f1/3f16c94c5de75d27dcc25fac3cd43343.jpg',
        createdAt: '2023-08-23 19:34:30',
        updatedAt: '2023-08-23 19:34:30',
    },
    {
        id: 37212,
        name: 'Europa Universalis III',
        playtime: 2,
        backgroundImage:
            'https://media.rawg.io/media/screenshots/bc9/bc9cf8d960c31553b8c16df8ce886c05.jpg',
        createdAt: '2023-08-23 19:33:02',
        updatedAt: '2023-08-23 19:33:02',
    },
    {
        id: 257189,
        name: 'StarCraft: Brood War',
        playtime: null,
        backgroundImage:
            'https://media.rawg.io/media/screenshots/5d4/5d43fe0388f02f989d6afb0a9d50ad6c.jpg',
        createdAt: '2023-08-23 19:35:36',
        updatedAt: '2023-08-23 19:35:36',
    },
    {
        id: 359139,
        name: 'Shadow Tower Abyss',
        playtime: null,
        backgroundImage:
            'https://media.rawg.io/media/games/d95/d95f4a4fb48f0afb488ec19cffa13bf1.jpg',
        createdAt: '2023-08-23 19:34:54',
        updatedAt: '2023-08-23 19:34:54',
    },
]
exports.entries = [
    [
        // Julian's Entries
        {
            gameId: 10037,
            order: 0,
            isStarred: false,
            isOwned: false,
            isPlaying: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
        {
            gameId: 10340,
            order: 1,
            isStarred: false,
            isOwned: false,
            isPlaying: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
        {
            gameId: 13820,
            order: 2,
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
            gameId: 10037,
            order: 0,
            isStarred: false,
            isOwned: false,
            isPlaying: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
        {
            gameId: 10340,
            order: 1,
            isStarred: false,
            isOwned: false,
            isPlaying: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
        {
            gameId: 13820,
            order: 2,
            isStarred: false,
            isOwned: false,
            isPlaying: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
        {
            gameId: 31033,
            order: 3,
            isStarred: false,
            isOwned: false,
            isPlaying: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
        {
            gameId: 492,
            order: 4,
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
            gameId: 624,
            order: 0,
            isStarred: false,
            isOwned: false,
            isPlaying: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
        {
            gameId: 257189,
            order: 1,
            isStarred: false,
            isOwned: false,
            isPlaying: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
    ],
]
