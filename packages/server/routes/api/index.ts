import express from 'express'
import { Router } from 'express'
import userRouter from './user'
import searchRouter from './search'
import mockRawgRouter from './mockRawgApi'

const router: Router = express.Router()
router.use('/users', userRouter)
router.use(searchRouter)
router.use('/mockrawg', mockRawgRouter)

export default router
