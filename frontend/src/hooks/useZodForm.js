import { useState } from 'react'
import { validateWithSchema } from '../utils/validation.js'

/**
 * Holds a form's values and checks them against a Zod schema as the user types.
 *
 * A field's error appears once the user has typed in it (onChange) or left it
 * (onBlur) - never for a field they have not reached yet, so a fresh form does
 * not open covered in red. Pressing submit reveals every remaining error.
 */
export default function useZodForm(schema, initialValues) {
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})
  const [serverErrors, setServerErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Re-checked on every render, so the errors always match what is on screen.
  const { errors: schemaErrors } = validateWithSchema(schema, values)

  function getError(name) {
    return (touched[name] && schemaErrors[name]) || serverErrors[name]
  }

  function markTouched(name) {
    setTouched((prev) => (prev[name] ? prev : { ...prev, [name]: true }))
  }

  function handleChange(event) {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    markTouched(name)
    // Any complaint from the server was about the old value, so drop it.
    setServerErrors((prev) => ({ ...prev, [name]: undefined }))
    setFormError('')
  }

  function handleBlur(event) {
    markTouched(event.target.name)
  }

  /** Everything an <Input> needs for one field: pass it with {...getFieldProps('username')}. */
  function getFieldProps(name) {
    return {
      name,
      value: values[name],
      onChange: handleChange,
      onBlur: handleBlur,
      error: getError(name)
    }
  }

  /** Wraps the page's submit logic so it only runs when every field is valid. */
  function handleSubmit(onValid) {
    return async (event) => {
      event.preventDefault()

      // Reveal the errors of fields the user skipped, too.
      setTouched(Object.fromEntries(Object.keys(initialValues).map((name) => [name, true])))
      setFormError('')

      const { data, errors } = validateWithSchema(schema, values)
      if (Object.keys(errors).length > 0) {
        return
      }

      setIsSubmitting(true)
      try {
        await onValid(data)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return {
    values,
    isSubmitting,
    formError,
    setFormError,
    setServerErrors,
    getFieldProps,
    handleSubmit
  }
}
