import { Router } from 'express'
import { getPing } from '../controllers/index.controllers.js'

const router = Router()

router.get('/ping', getPing)

export default router