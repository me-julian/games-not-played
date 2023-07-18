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

/* Configure session management.
 *
 * When a login session is established, information about the user will be
 * stored in the session.  This information is supplied by the `serializeUser`
 * function, which is yielding the user ID and username.
 *
 * As the user interacts with the app, subsequent requests will be authenticated
 * by verifying the session.  The same user information that was serialized at
 * session establishment will be restored when the session is authenticated by
 * the `deserializeUser` function.
 *
 * Since every request to the app needs the user ID and username, in order to
 * fetch todo records and render the user element in the navigation bar, that
 * information is stored in the session.
 */
// passport.serializeUser(function (user, cb) {
//     process.nextTick(function () {
//         cb(null, { id: user.id, username: user.username })
//     })
// })

// passport.deserializeUser(function (
//     user: false | Express.User | null | undefined,
//     cb
// ) {
//     process.nextTick(function () {
//         return cb(null, user)
//     })
// })

const router: Router = express.Router()

/** POST /login/password
 *
 * This route authenticates the user by verifying a username and password.
 *
 * A username and password are submitted to this route via an HTML form, which
 * was rendered by the `GET /login` route.  The username and password is
 * authenticated using the `local` strategy.  The strategy will parse the
 * username and password from the request and call the `verify` function.
 *
 * Upon successful authentication, a login session will be established.  As the
 * user interacts with the app, by clicking links and submitting forms, the
 * subsequent requests will be authenticated by verifying the session.
 *
 * When authentication fails, the user will be re-prompted to login and shown
 * a message informing them of what went wrong.
 *
 * @openapi
 * /login/password:
 *   post:
 *     summary: Log in using a username and password
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: number
 *     responses:
 *       "302":
 *         description: Redirect. Unused.
 */
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

/* POST /signup
 *
 * This route creates a new user account.
 *
 * A desired username and password are submitted to this route via an HTML form,
 * which was rendered by the `GET /signup` route.  The password is hashed and
 * then a new user record is inserted into the database.  If the record is
 * successfully created, the user is logged in.
 */
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
                        req.login(
                            { id: user.id, username: user.username },
                            function (err) {
                                if (err) {
                                    return next(err)
                                }
                                res.redirect('/')
                            }
                        )
                    } else {
                        console.log('HIT REJECTED')
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
