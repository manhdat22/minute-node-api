import { Router, Response, Request, NextFunction } from 'express'
import { RepositoryController } from '../controllers/repository.controller'

const repositoryController = new RepositoryController()
const router = Router()

router.get('/repositories', repositoryController.index)

router.get('/repositories/:id', repositoryController.show)

router.post('/repositories', repositoryController.create)

router.put('/repositories/:id', repositoryController.update)

export default router
