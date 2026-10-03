import { z } from 'zod'
import { FIELD_LIMITS, USERNAME_PATTERN } from '../constants/config.js'
import { VALIDATION_MESSAGES } from '../constants/messages.js'

/**
 * Field rules shared by the sign-in and sign-up forms, so both give the same
 * live warnings. They copy the backend's rules in RegisterRequest.java.
 */
const usernameRule = z
  .string()
  .trim()
  .min(1, VALIDATION_MESSAGES.USERNAME_REQUIRED)
  .min(FIELD_LIMITS.USERNAME_MIN, VALIDATION_MESSAGES.USERNAME_TOO_SHORT)
  .max(FIELD_LIMITS.USERNAME_MAX, VALIDATION_MESSAGES.USERNAME_TOO_LONG)
  .regex(USERNAME_PATTERN, VALIDATION_MESSAGES.USERNAME_INVALID_CHARACTERS)

// Not trimmed: a space can be a deliberate part of a password.
const passwordRule = z
  .string()
  .min(1, VALIDATION_MESSAGES.PASSWORD_REQUIRED)
  .min(FIELD_LIMITS.PASSWORD_MIN, VALIDATION_MESSAGES.PASSWORD_TOO_SHORT)
  .max(FIELD_LIMITS.PASSWORD_MAX, VALIDATION_MESSAGES.PASSWORD_TOO_LONG)

export const loginSchema = z.object({
  username: usernameRule,
  password: passwordRule
})

export const registerSchema = z.object({
  username: usernameRule,
  displayName: z
    .string()
    .trim()
    .max(FIELD_LIMITS.DISPLAY_NAME_MAX, VALIDATION_MESSAGES.DISPLAY_NAME_TOO_LONG),
  password: passwordRule
})
