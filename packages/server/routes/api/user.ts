import express from 'express'
import { Router } from 'express'
import EnsureLogIn from 'connect-ensure-login'

const ensureLoggedIn = EnsureLogIn.ensureLoggedIn()

const router: Router = express.Router()

router.get('/user', ensureLoggedIn, (req, res) => {
    res.send({ username: req.session.passport?.user.username })
})

router.post('/user', ensureLoggedIn, (req, res) => {
    res.send(404)
})

export default router
