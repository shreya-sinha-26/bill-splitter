import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/common/Button.jsx'
import Card from '../components/common/Card.jsx'
import Input from '../components/common/Input.jsx'
import { DEMO_ACCOUNTS, HTTP_STATUS } from '../constants/config.js'
import { FIELD_LABELS, LOGIN_TEXT } from '../constants/labels.js'
import { AUTH_MESSAGES } from '../constants/messages.js'
import { ROUTES } from '../constants/routes.js'
import { useAuth } from '../context/AuthContext.jsx'
import useZodForm from '../hooks/useZodForm.js'
import { getRequestErrorMessage } from '../utils/errors.js'
import { loginSchema } from '../validation/authSchemas.js'

const INITIAL_VALUES = { username: '', password: '' }

export default function LoginPage() {
  const { login } = useAuth()
  const { isSubmitting, formError, setFormError, getFieldProps, handleSubmit } = useZodForm(
    loginSchema,
    INITIAL_VALUES
  )

  const onSubmit = handleSubmit(async ({ username, password }) => {
    try {
      await login(username, password)
      // No redirect needed: once signed in, GuestRoute sends the user home.
    } catch (error) {
      setFormError(
        error.status === HTTP_STATUS.UNAUTHORIZED
          ? AUTH_MESSAGES.INVALID_CREDENTIALS
          : getRequestErrorMessage(error)
      )
    }
  })

  return (
    <section className="auth-page">
      <Card
        className="auth-card"
        title={LOGIN_TEXT.TITLE}
        titleAs="h1"
        description={LOGIN_TEXT.SUBTITLE}
      >
        {/* noValidate turns off the browser's own pop-up checks, so only our Zod messages show. */}
        <form onSubmit={onSubmit} noValidate>
          <Input
            id="login-username"
            label={FIELD_LABELS.USERNAME}
            autoComplete="username"
            autoFocus
            {...getFieldProps('username')}
          />
          <Input
            id="login-password"
            type="password"
            label={FIELD_LABELS.PASSWORD}
            autoComplete="current-password"
            {...getFieldProps('password')}
          />

          {formError && (
            <p className="field-error auth-error" role="alert">
              {formError}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            block
            isLoading={isSubmitting}
            loadingText={LOGIN_TEXT.SUBMITTING}
          >
            {LOGIN_TEXT.SUBMIT}
          </Button>
        </form>

        <p className="auth-switch">
          {LOGIN_TEXT.SWITCH_PROMPT} <Link to={ROUTES.REGISTER}>{LOGIN_TEXT.SWITCH_LINK}</Link>
        </p>

        <p className="auth-demo">
          {LOGIN_TEXT.DEMO_PREFIX}{' '}
          {DEMO_ACCOUNTS.USERNAMES.map((name, index) => (
            <Fragment key={name}>
              {index > 0 && ', '}
              <code>{name}</code>
            </Fragment>
          ))}{' '}
          — {LOGIN_TEXT.DEMO_PASSWORD_LABEL} <code>{DEMO_ACCOUNTS.PASSWORD}</code>
        </p>
      </Card>
    </section>
  )
}
