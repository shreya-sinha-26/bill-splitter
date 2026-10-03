/**
 * Checks values against a Zod schema and returns them in a form-friendly shape.
 *
 * Returns { data, errors }:
 * - data   - the cleaned values (e.g. spaces trimmed), or null if anything failed
 * - errors - one message per field name, e.g. { password: 'Password must be...' }
 *
 * When a field breaks several rules, only the first message is kept, so the
 * user fixes one thing at a time.
 */
export function validateWithSchema(schema, values) {
  const result = schema.safeParse(values)
  if (result.success) {
    return { data: result.data, errors: {} }
  }

  const errors = {}
  for (const issue of result.error.issues) {
    const field = issue.path[0]
    if (field !== undefined && !(field in errors)) {
      errors[field] = issue.message
    }
  }
  return { data: null, errors }
}
