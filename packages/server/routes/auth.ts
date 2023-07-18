import express from 'express'
import { Router } from 'express'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import jsonwebtoken from 'jsonwebtoken'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import crypto from 'crypto'
import db from '../db/db'

declare global {
    namespace Express {
        interface User {
            id: string
            username: string
        }
    }
}

/* Configure password authentication strategy.
 *
 * The `LocalStrategy` authenticates users by verifying a username and password.
 * The strategy parses the username and password from the request and calls the
 * `verify` function.
 *
 * The `verify` function queries the database for the user record and verifies
 * the password by hashing the password supplied by the user and comparing it to
 * the hashed password stored in the database.  If the comparison succeeds, the
 * user is authenticated; otherwise, not.
 */
passport.use(
    new LocalStrategy(function verify(username, password, cb) {
        const getUser = db.users.findOne({
            where: {
                username: username,
            },
        })

        getUser.then(
            (user) => {
                if (user) {
                    crypto.pbkdf2(
                        password,
                        user.salt,
                        310000,
                        32,
                        'sha256',
                        function (err, hashedPassword) {
                            if (err) {
                                return cb(err)
                            }
                            if (
                                !crypto.timingSafeEqual(
                                    user.hashed_password,
                                    hashedPassword
                                )
                            ) {
                                return cb(null, false, {
                                    message: 'Incorrect username or password.',
                                })
                            }
                            return cb(null, {
                                id: user.id,
                                username: user.username,
                            })
                        }
                    )
                } else {
                    return cb(null, false, {
                        message: 'Incorrect username or password.',
                    })
                }
            },
            (error) => {
                return cb(error)
            }
        )
    })
)

// JWT
passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secret',
            issuer: 'localhost',
            audience: 'localhost',
        },
        function (jwt_payload, cb) {
            const getUser = db.users.findOne({
                where: {
                    username: jwt_payload.username,
                },
            })

            getUser.then(
                (user) => {
                    if (user) {
                        return cb(null, {
                            id: user.id,
                            username: user.username,
                        })
                    } else {
                        return cb(null, false)
                    }
                },
                (error) => {
                    return cb(error, false)
                }
            )
        }
    )
)

const router: Router = express.Router()

router.post('/login/password', (req, res, next) => {
    passport.authenticate(
        'local',
        { session: false },
        (err: Error, user: Express.User, info: string, status: number) => {
            if (err || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user: user,
                })
            }
            req.login(user, { session: false }, (err) => {
                if (err) {
                    res.send(err)
                }
                // generate a signed son web token with the contents of user object and return it in the response
                const jwt = jsonwebtoken.sign(user, 'your_jwt_secret')
                return res.json({ jwt, user })
            })
        }
    )(req, res, next)
})

router.post('/signup', async function (req, res, next) {
    var salt = crypto.randomBytes(16)
    crypto.pbkdf2(
        req.body.password,
        salt,
        310000,
        32,
        'sha256',
        function (err, hashedPassword) {
            if (err) {
                return next(err)
            }

            const createUser = db.users.create({
                username: req.body.username,
                hashed_password: hashedPassword,
                salt,
            })

            createUser.then(
                (user) => {
                    if (user) {
                        const partialUser = {
                            username: user.username,
                            id: user.id,
                        }
                        // generate a signed son web token with the contents of user object and return it in the response
                        const jwt = jsonwebtoken.sign(
                            partialUser,
                            'your_jwt_secret'
                        )
                        return res.json({
                            jwt,
                            user: partialUser,
                        })
                    } else {
                        return next(new Error('Failed to register new user.'))
                    }
                },
                (error) => {
                    if (error.name === 'SequelizeUniqueConstraintError') {
                        res.sendStatus(403)
                    } else {
                        return next(error)
                    }
                }
            )
        }
    )
})

export default router
