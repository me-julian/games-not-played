import express from 'express'
import { Router } from 'express'
import userRouter from './user'
import mockRawgRouter from './mockRawgApi'

const router: Router = express.Router()
router.use('/users', userRouter)
router.use('/mockRawg', mockRawgRouter)

export default router
