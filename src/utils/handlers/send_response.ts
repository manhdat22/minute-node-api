import { ErrorCode } from '../../config/error_code'
import { HttpStatus, HTTP_STATUS } from '../../config/http_status'
import { Response, NextFunction } from 'express'

// interface ISendResponse {
//   response: Response
//   payload: any
//   next?: NextFunction
//   httpStatus?: HttpStatus
//   errorCode?: ErrorCode
// }

// export class SendResponse implements ISendResponse {
//   constructor(
//     response: Response,
//     payload: any,
//     next?: NextFunction,
//     httpStatus?: HttpStatus,
//     errorCode?: ErrorCode,
//   ) {
//     this.response = response
//     this.payload = payload
//     this.next = next
//     this.httpStatus = httpStatus
//     this.errorCode = errorCode
//   }

//   public response: Response
//   public payload: any
//   public next?: NextFunction
//   public httpStatus: HttpStatus
//   public errorCode?: ErrorCode
//   }
// }

export const sendSuccess = (response: Response, payload: any): void => {
  response.status(HTTP_STATUS.OK).json(payload)
}

export const sendError = (
  response: Response,
  httpStatus?: HttpStatus,
  errorCode?: ErrorCode,
  payload?: any,
): void => {
  response.status(httpStatus).json({ ...payload, ...errorCode })
}
