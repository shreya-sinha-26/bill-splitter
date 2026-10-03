export const APP_NAME = 'Household Bill Splitter'

/**
 * Limits on account fields. These must match the backend's rules in
 * RegisterRequest.java, or the form could accept something the server rejects.
 */
export const FIELD_LIMITS = {
  USERNAME_MIN: 3,
  USERNAME_MAX: 40,
  PASSWORD_MIN: 8,
  PASSWORD_MAX: 72,
  DISPLAY_NAME_MAX: 60
}

/** Letters, digits, dot, dash and underscore only - the same rule as the backend. */
export const USERNAME_PATTERN = /^[A-Za-z0-9._-]+$/

/** HTTP status codes the forms react to. 0 means the server could not be reached. */
export const HTTP_STATUS = {
  NETWORK_ERROR: 0,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  CONFLICT: 409
}

/** Created by the backend on startup; listed on the sign-in page for testing. */
export const DEMO_ACCOUNTS = {
  USERNAMES: ['alice', 'bob', 'charlie', 'diya', 'eshan'],
  PASSWORD: 'password123'
}
