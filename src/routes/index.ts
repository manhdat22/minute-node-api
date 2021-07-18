import { Router } from 'express'
import repository from './repository.route'
import checklist from './checklist.route'

const rootRouter = Router()

rootRouter.use('/api/v1', repository)
rootRouter.use('/api/v1', checklist)

export default rootRouter
