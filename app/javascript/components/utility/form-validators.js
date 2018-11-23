
export const required = (fieldLabel) => {
  return (value) => {
    const error = `${fieldLabel} is required`
    if (value === 0) return
    if (!value) return error

    const cleanedValue = (`${value}` || '').trim()
    return cleanedValue ? undefined : error
  }
}

const emailRegex = new RegExp("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$")

export const email = (value) => emailRegex.test(value) ? undefined : 'Invalid email'

const nameRegex = new RegExp('^[\\w-\'\\s\\.]+$')

export const cleanName = (value) => {
  return nameRegex.test(value) ? undefined : 'Invalid Name'
}

export const minLength = (fieldLabel, minLength) => {
  return (value) => {
    return value.trim().length >= minLength
      ? undefined
      : `${fieldLabel} must be at least ${minLength} character(s) long`
  }
}

export const maxLength = (fieldLabel, maxLength) => {
  return (value) => {
    return value.trim().length <= maxLength
      ? undefined
      : `${fieldLabel} must be less than ${maxLength + 1} characters long`
  }
}

export const boundedNumber = (fieldLabel, min, max) => {
  return (value) => {
    if (isNaN(value) || typeof value === 'string' && (
      value.trim().length === 0 || value.endsWith('.'))) {
      return 'Invalid input'
    }
    value = Number.parseFloat(value)
    if (value > max) return `${fieldLabel} must be less than ${max + 1}`
    if (value < min) return `${fieldLabel} must be at least ${min}`
    return undefined
  }
}

const passwordRegex = new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')

export const password = (value) => {
  return (
    passwordRegex.test(value) ?
      undefined : 'Password must have at least eight characters, one letter, and one number'
  )
}

export const passwordsMustMatch = (value, allValues) => {
  return (value !== allValues.password ? 'Passwords do not match' : undefined)
}
