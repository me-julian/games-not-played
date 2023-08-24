import express from 'express'
import { Router } from 'express'
import userRouter from './user'
import searchRouter from './search'

const router: Router = express.Router()
router.use('/users', userRouter)
router.use(searchRouter)

export default router
