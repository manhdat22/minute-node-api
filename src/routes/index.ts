import { Router } from 'express'
import post from './post.route'

const rootRouter = Router()

rootRouter.use('/api/v1', post)

export default rootRouter
