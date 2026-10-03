import { FIELD_LIMITS } from './config.js'

/** Shown under a form field when its value breaks a rule. */
export const VALIDATION_MESSAGES = {
  USERNAME_REQUIRED: 'Please enter a username.',
  USERNAME_TOO_SHORT: `Username must be at least ${FIELD_LIMITS.USERNAME_MIN} characters.`,
  USERNAME_TOO_LONG: `Username must be ${FIELD_LIMITS.USERNAME_MAX} characters or fewer.`,
  USERNAME_INVALID_CHARACTERS:
    'Username can only use letters, numbers, dots (.), dashes (-) and underscores (_).',
  PASSWORD_REQUIRED: 'Please enter a password.',
  PASSWORD_TOO_SHORT: `Password must be at least ${FIELD_LIMITS.PASSWORD_MIN} characters.`,
  PASSWORD_TOO_LONG: `Password must be ${FIELD_LIMITS.PASSWORD_MAX} characters or fewer.`,
  DISPLAY_NAME_TOO_LONG: `Display name must be ${FIELD_LIMITS.DISPLAY_NAME_MAX} characters or fewer.`
}

/** Shown when the server turns down a sign-in or sign-up. */
export const AUTH_MESSAGES = {
  INVALID_CREDENTIALS: 'Incorrect username or password.',
  USERNAME_TAKEN: 'That username is already taken. Please choose another.',
  FIX_HIGHLIGHTED_FIELDS: 'Please fix the highlighted fields and try again.'
}

/** Shown when a request fails for a reason the user cannot fix in the form. */
export const ERROR_MESSAGES = {
  SERVER_UNREACHABLE: 'Cannot reach the server. Please check that the backend is running.',
  UNEXPECTED: 'Something went wrong. Please try again.'
}
