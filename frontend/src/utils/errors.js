import { HTTP_STATUS } from '../constants/config.js'
import { ERROR_MESSAGES } from '../constants/messages.js'

/** A readable message for a failed request that no form field is to blame for. */
export function getRequestErrorMessage(error) {
  if (error.status === HTTP_STATUS.NETWORK_ERROR) {
    return ERROR_MESSAGES.SERVER_UNREACHABLE
  }
  return ERROR_MESSAGES.UNEXPECTED
}
