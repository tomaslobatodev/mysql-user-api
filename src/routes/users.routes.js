import { Router } from 'express'
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
} from '../controllers/users.controllers.js'

const router = Router()

router.get('/users', getUsers)
router.get('/users/:id', getUser)
router.post('/users', createUser)
router.patch('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

export default router
