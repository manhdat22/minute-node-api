import { Request, Response } from 'express'
import { ValidationError } from 'sequelize'
import { Repository } from '../models/repository.model'
import { BaseController } from './base.controller'
import { HTTP_STATUS } from '../config/http_status'
import { ERROR_CODE } from '../config/error_code'
import { sendSuccess, sendError } from '../utils/handlers/send_response'
import { validationMessages } from '../utils/handlers/validation_messages'
import { Checklist } from '../models/checklist.model'

export class RepositoryController extends BaseController {
  public async index(req: Request, res: Response): Promise<void> {
    try {
      const repositories = await Repository.findAll()
      sendSuccess(res, repositories)
    } catch (e) {
      sendError(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        ERROR_CODE.INTERNAL_ERROR,
      )
    }
  }

  public async show(req: Request, res: Response): Promise<void> {
    try {
      const repository = await Repository.findByPk(req.params.id, {
        include: { model: Checklist, as: 'checklists' },
      })

      if (repository) {
        sendSuccess(res, repository)
      } else {
        sendError(res, HTTP_STATUS.NOT_FOUND, ERROR_CODE.RECORD_NOT_FOUND)
      }
    } catch (e) {
      console.log(e)

      sendError(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        ERROR_CODE.INTERNAL_ERROR,
      )
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const repository = await Repository.create({
        userId: req.body.userId,
        name: req.body.name,
        url: req.body.url,
        username: req.body.username,
        password: req.body.password,
      })

      sendSuccess(res, repository)
    } catch (e) {
      if (e instanceof ValidationError) {
        sendError(
          res,
          HTTP_STATUS.UNPROCESSABLE_ENTITY,
          ERROR_CODE.INVALID,
          validationMessages(e),
        )
      } else {
        sendError(
          res,
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          ERROR_CODE.INTERNAL_ERROR,
        )
      }
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const repository = await Repository.update(
        {
          name: req.body.name,
          url: req.body.url,
          username: req.body.username,
          password: req.body.password,
        },
        { where: { id: req.params.id } },
      )

      if (repository) {
        sendSuccess(res, repository)
      } else {
        sendError(res, HTTP_STATUS.NOT_FOUND, ERROR_CODE.RECORD_NOT_FOUND)
      }
    } catch (e) {
      if (e instanceof ValidationError) {
        sendError(
          res,
          HTTP_STATUS.UNPROCESSABLE_ENTITY,
          ERROR_CODE.INVALID,
          validationMessages(e),
        )
      } else {
        sendError(
          res,
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          ERROR_CODE.INTERNAL_ERROR,
        )
      }
    }
  }
}
