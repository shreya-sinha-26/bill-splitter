import { Link } from 'react-router-dom'
import Button from '../components/common/Button.jsx'
import Card from '../components/common/Card.jsx'
import Input from '../components/common/Input.jsx'
import { HTTP_STATUS } from '../constants/config.js'
import { FIELD_HINTS, FIELD_LABELS, REGISTER_TEXT } from '../constants/labels.js'
import { AUTH_MESSAGES } from '../constants/messages.js'
import { ROUTES } from '../constants/routes.js'
import { useAuth } from '../context/AuthContext.jsx'
import useZodForm from '../hooks/useZodForm.js'
import { getRequestErrorMessage } from '../utils/errors.js'
import { registerSchema } from '../validation/authSchemas.js'

const INITIAL_VALUES = { username: '', displayName: '', password: '' }

export default function RegisterPage() {
  const { register } = useAuth()
  const { isSubmitting, formError, setFormError, setServerErrors, getFieldProps, handleSubmit } =
    useZodForm(registerSchema, INITIAL_VALUES)

  const onSubmit = handleSubmit(async ({ username, password, displayName }) => {
    try {
      await register(username, password, displayName)
      // No redirect needed: once signed in, GuestRoute sends the user home.
    } catch (error) {
      if (error.status === HTTP_STATUS.CONFLICT) {
        setServerErrors({ username: AUTH_MESSAGES.USERNAME_TAKEN })
      } else if (error.status === HTTP_STATUS.BAD_REQUEST) {
        setServerErrors(error.fieldErrors)
        setFormError(AUTH_MESSAGES.FIX_HIGHLIGHTED_FIELDS)
      } else {
        setFormError(getRequestErrorMessage(error))
      }
    }
  })

  return (
    <section className="auth-page">
      <Card
        className="auth-card"
        title={REGISTER_TEXT.TITLE}
        titleAs="h1"
        description={REGISTER_TEXT.SUBTITLE}
      >
        {/* noValidate turns off the browser's own pop-up checks, so only our Zod messages show. */}
        <form onSubmit={onSubmit} noValidate>
          <Input
            id="register-username"
            label={FIELD_LABELS.USERNAME}
            autoComplete="username"
            autoFocus
            {...getFieldProps('username')}
          />
          <Input
            id="register-display-name"
            label={FIELD_LABELS.DISPLAY_NAME}
            hint={FIELD_HINTS.DISPLAY_NAME}
            autoComplete="nickname"
            {...getFieldProps('displayName')}
          />
          <Input
            id="register-password"
            type="password"
            label={FIELD_LABELS.PASSWORD}
            hint={FIELD_HINTS.PASSWORD}
            autoComplete="new-password"
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
            loadingText={REGISTER_TEXT.SUBMITTING}
          >
            {REGISTER_TEXT.SUBMIT}
          </Button>
        </form>

        <p className="auth-switch">
          {REGISTER_TEXT.SWITCH_PROMPT} <Link to={ROUTES.LOGIN}>{REGISTER_TEXT.SWITCH_LINK}</Link>
        </p>
      </Card>
    </section>
  )
}
