import { Router } from 'express'
import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
  getClient,
} from '../controllers/clients.controllers.js'

const router = Router()

router.get('/clients', getClients)
router.get('/clients/:id', getClient)
router.post('/clients', createClient)
router.patch('/clients/:id', updateClient)
router.delete('/clients/:id', deleteClient)

export default router
