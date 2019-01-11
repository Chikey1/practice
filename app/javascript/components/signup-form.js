import React from 'react'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer, Field, reduxForm } from 'redux-form'
import {
  required,
  cleanName,
  email,
  passwordsMustMatch,
  password,
  maxLength,
} from 'components/utility/form-validators'

import { navigateTo } from 'components/utility/location'
import { post } from 'components/utility/api'
import LabelledInput from 'components/utility/labelled-input'
import Alert from 'components/utility/alert'

export const store = createStore(combineReducers({ form: formReducer }))

class SignupForm extends React.Component {
  state = { serverError: false }

  onSubmit = (values) => {
    const data = { user: values }
    this.setState({ serverError: false })

    post('/signup', data).then(function (response) {
      if (response.status === 200) {
        navigateTo('/')
      } else {
        this.setState({ serverError: true })
        window.scroll(0,0)
      }
    }.bind(this))
  }


  render () {
    const { handleSubmit, submitting } = this.props
    const { serverError } = this.state
    return (
        <form onSubmit={handleSubmit(this.onSubmit)} className='bg-light p-4 text-dark rounded'>
          <div className='my-2 mx-4'>
          { serverError &&
            <Alert
              alertType='alert-danger'
              message='Could not create account.'
            />
          }
            <h2 className='text-primary mb-4 py-3 font-weight-bold'>
              - Create an Account -
            </h2>
            <Field
              name='name'
              component={LabelledInput}
              type='text'
              label='Name'
              validate={[requireName, cleanName, maxLengthName]}
            />
            <Field
              name='email'
              component={LabelledInput}
              label='Email'
              type='email'
              validate={[requireEmail, email, maxLengthEmail]}
            />
            <Field
              name='password'
              component={LabelledInput}
              label='Password'
              type='password'
              validate={[requirePassword, password, maxLengthPassword]}
            />
            <Field
              name='password_confirmation'
              component={LabelledInput}
              label='Password Confirmation'
              type='password'
              validate={[requirePasswordConfirmation, passwordsMustMatch]}
            />
          <div className='pb-2 pt-3'>
            <button type='submit' className='btn btn-dark px-4' disabled={submitting}>Submit</button>
          </div>
        </div>
      </form>
    )
  }
}

const requireEmail = required('Email')
const requireName = required('Name')
const requirePassword = required('Password')
const requirePasswordConfirmation = required('Password confirmation')
const maxLengthName = maxLength('Name', 50)
const maxLengthEmail = maxLength('Email', 255)
const maxLengthPassword = maxLength('Password', 30)

export default reduxForm({
  form: 'signup'  // a unique identifier for this form
})(SignupForm)
