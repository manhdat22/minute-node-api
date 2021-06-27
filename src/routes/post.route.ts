import { Router } from 'express'
import { PostController } from '../controllers/post.controller'

const postController = new PostController()
const router = Router()

router.get('/posts', postController.index)

router.get('/posts/:id', postController.show)

router.post('/posts', postController.create)

router.put('/posts/:id', postController.update)

export default router
