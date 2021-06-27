import { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'sequelize'
import { CustomValidationError } from '../utils/exceptions/custom_validation_error'
import { HTTP_STATUS } from '../config/http_status'
import { Post } from '../models/post.model'
import { User } from '../models/user.model'
import { BaseController } from './base.controller'
import { validationMessages } from '../utils/handlers/validation_messages'

export class PostController extends BaseController {
  public async index(req: Request, res: Response): Promise<void> {
    try {
      const posts = await Post.findAll({ include: User })
      res.status(HTTP_STATUS.OK).json(posts)
    } catch (e) {
      console.log(e)
      res.status(HTTP_STATUS.BAD_REQUEST)
    }
  }

  public async show(req: Request, res: Response): Promise<void> {
    try {
      const post = await Post.findByPk(req.params.id)
      res.status(HTTP_STATUS.OK).json(post)
    } catch (e) {
      console.log(e)
      res.status(HTTP_STATUS.BAD_REQUEST)
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const post = await Post.create({
        title: req.body.title,
        content: req.body.content,
      })

      res.status(HTTP_STATUS.OK).json({ status: 'ok' })
    } catch (e) {
      if (e instanceof ValidationError) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(validationMessages(e))
        return
      } else {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ error: e.message })
      }
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const post = await Post.update(
        {
          title: req.body.title,
          content: req.body.content,
        },
        { where: { id: req.params.id } },
      )

      if (post) {
        res.status(HTTP_STATUS.OK).json({ post, status: 'ok' })
      } else {
        throw new Error('Record Not Found')
      }
    } catch (e) {
      console.log(e)
      res.status(HTTP_STATUS.BAD_REQUEST).json({})
    }
  }
}
