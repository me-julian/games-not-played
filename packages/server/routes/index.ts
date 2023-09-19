import express from 'express'
import { Router } from 'express'
import authRouter from './auth'
import userRouter from './user'
import searchRouter from './search'

const router: Router = express.Router()
router.use(authRouter)
router.use(userRouter)
router.use(searchRouter)

export default router
