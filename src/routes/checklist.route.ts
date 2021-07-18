import { Router, Response, Request, NextFunction } from 'express'
import { ChecklistController } from '../controllers/checklist.controller'

const checklistController = new ChecklistController()
const router = Router()

router.get('/checklists', checklistController.index)

router.get('/checklists/:id', checklistController.show)

router.post('/checklists', checklistController.create)

router.put('/checklists/:id', checklistController.update)

export default router
