import express, { NextFunction, Request, Response } from 'express'
import EnsureLogIn from 'connect-ensure-login'

import db from '../db/db'

const ensureLoggedIn = EnsureLogIn.ensureLoggedIn()

function fetchTodos(req: Request, res: Response, next: NextFunction) {
    // const getUser = db.users.findOne({
    // where: {
    // username: req.user.username,
    // },
    // })
    next()
}

var router = express.Router()

/* GET home page. */
router.get(
    '/home',
    function (req: Request, res: Response, next: NextFunction) {
        if (!req.user) {
            return res.render('home')
        }
        next()
    },
    fetchTodos,
    function (req, res, next) {
        res.locals.filter = null
        res.redirect('/')
    }
)

router.post(
    '/',
    ensureLoggedIn,
    function (req, res, next) {
        req.body.title = req.body.title.trim()
        next()
    },
    function (req, res, next) {
        if (req.body.title !== '') {
            return next()
        }
        return res.redirect('/' + (req.body.filter || ''))
    },
    function (req, res, next) {
        // db.run(
        //     'INSERT INTO todos (owner_id, title, completed) VALUES (?, ?, ?)',
        //     [
        //         req.user.id,
        //         req.body.title,
        //         req.body.completed == true ? 1 : null,
        //     ],
        //     function (err) {
        //         if (err) {
        //             return next(err)
        //         }
        //         return res.redirect('/' + (req.body.filter || ''))
        //     }
        // )
    }
)

router.post(
    '/:id(\\d+)',
    ensureLoggedIn,
    function (req, res, next) {
        req.body.title = req.body.title.trim()
        next()
    },
    function (req, res, next) {
        if (req.body.title !== '') {
            return next()
        }
        // db.run(
        //     'DELETE FROM todos WHERE id = ? AND owner_id = ?',
        //     [req.params.id, req.user.id],
        //     function (err) {
        //         if (err) {
        //             return next(err)
        //         }
        //         return res.redirect('/' + (req.body.filter || ''))
        //     }
        // )
    },
    function (req, res, next) {
        // db.run(
        //     'UPDATE todos SET title = ?, completed = ? WHERE id = ? AND owner_id = ?',
        //     [
        //         req.body.title,
        //         req.body.completed !== undefined ? 1 : null,
        //         req.params.id,
        //         req.user.id,
        //     ],
        //     function (err) {
        //         if (err) {
        //             return next(err)
        //         }
        //         return res.redirect('/' + (req.body.filter || ''))
        //     }
        // )
    }
)

// Check auth anytime hitting serverside (non-login) urls.
router.get('*', ensureLoggedIn)

module.exports = router
