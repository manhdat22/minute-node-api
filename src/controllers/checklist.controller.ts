import { Request, Response } from 'express'
import { ValidationError } from 'sequelize'
import { Checklist } from '../models/checklist.model'
import { BaseController } from './base.controller'
import { HTTP_STATUS } from '../config/http_status'
import { ERROR_CODE } from '../config/error_code'
import { sendSuccess, sendError } from '../utils/handlers/send_response'
import { validationMessages } from '../utils/handlers/validation_messages'

export class ChecklistController extends BaseController {
  public async index(req: Request, res: Response): Promise<void> {
    try {
      const repositories = await Checklist.findAll()
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
      const checklist = await Checklist.findByPk(req.params.id)
      if (checklist) {
        sendSuccess(res, checklist)
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
      const checklist = await Checklist.create({
        repositoryId: req.body.repositoryId,
        type: req.body.type,
        pattern: req.body.pattern,
        note: req.body.note,
        file: req.body.file,
        regex: req.body.regex,
      })

      sendSuccess(res, checklist)
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
      const checklist = await Checklist.update(
        {
          repositoryId: req.body.repositoryId,
          type: req.body.type,
          pattern: req.body.pattern,
          note: req.body.note,
          file: req.body.file,
          regex: req.body.regex,
        },
        { where: { id: req.params.id } },
      )

      if (checklist) {
        sendSuccess(res, checklist)
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
