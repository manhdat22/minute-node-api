export type ErrorCode = { code: number; message: string }

export const ERROR_CODE = {
  // 404
  PAGE_NOT_FOUND: {
    code: 40401,
    message: 'Sorry, that page does not exist.',
  },
  RECORD_NOT_FOUND: {
    code: 40402,
    message: 'Sorry, that record does not exist.',
  },
  // 422
  INVALID: {
    code: 42201,
    message: 'Invalid data.',
  },
  // 500
  INTERNAL_ERROR: {
    code: 50001,
    message: 'Internal error.',
  },
}
