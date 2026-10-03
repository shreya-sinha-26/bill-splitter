import { FIELD_LIMITS } from './config.js'

/** Field labels, shared by every form that shows the field. */
export const FIELD_LABELS = {
  USERNAME: 'Username',
  DISPLAY_NAME: 'Display name (optional)',
  PASSWORD: 'Password'
}

/** Helper text shown under a field while it has no error. */
export const FIELD_HINTS = {
  DISPLAY_NAME: 'Shown to your group. Leave blank to use your username.',
  PASSWORD: `At least ${FIELD_LIMITS.PASSWORD_MIN} characters.`
}

export const LOGIN_TEXT = {
  TITLE: 'Sign in',
  SUBTITLE: 'Sign in to see the groups you belong to.',
  SUBMIT: 'Sign in',
  SUBMITTING: 'Signing in…',
  SWITCH_PROMPT: 'New here?',
  SWITCH_LINK: 'Create an account',
  DEMO_PREFIX: 'Demo accounts:',
  DEMO_PASSWORD_LABEL: 'password'
}

export const REGISTER_TEXT = {
  TITLE: 'Create an account',
  SUBTITLE: 'Your groups are private to their members. Create an account to start one.',
  SUBMIT: 'Create account',
  SUBMITTING: 'Creating account…',
  SWITCH_PROMPT: 'Already have an account?',
  SWITCH_LINK: 'Sign in'
}

export const HEADER_TEXT = {
  SIGN_OUT: 'Sign out'
}

export const FOOTER_TEXT = {
  TAGLINE: 'Split shared household costs fairly.'
}
