import express from 'express'
import { Router } from 'express'

const router: Router = express.Router()

router.get('/user', (req, res) => {
    // res.send({ username: req.user!.username })
})

router.post('/user', (req, res) => {
    res.send(404)
})

export default router
