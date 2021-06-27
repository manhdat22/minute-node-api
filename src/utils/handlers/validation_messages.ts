import { ValidationError } from 'sequelize'
import { CustomSequelizeError } from '../exceptions/custom_sequelize_error'

type ValidationMessages = { [key: string]: string[] }

export const validationMessages = (e: ValidationError): ValidationMessages => {
  let errorMessages: ValidationMessages = {}

  e.errors.forEach((item) => {
    const originalError = item.original as CustomSequelizeError

    errorMessages[originalError.field] ||= []
    errorMessages[originalError.field].push(originalError.message)
  })

  return errorMessages
}
