import React from 'react'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer, Field, reduxForm } from 'redux-form'
import { required, cleanName, email, passwordsMustMatch, password } from 'components/utility/form-validators'

import { navigateTo } from 'components/utility/location'
import LabelledInput from 'components/utility/labelled-input'
import Alert from 'components/utility/alert'

export const store = createStore(combineReducers({ form: formReducer }))

class SignupForm extends React.Component {
  state = { serverError: false }

  onSubmit = (values) => {
    const data = { user: values }
    this.setState({ serverError: false })

    fetch('/signup', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(function (response) {
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
          <h2 className='mb-4 py-3'>Create an Account</h2>
            <Field
              name='name'
              component={LabelledInput}
              type='text'
              label='Name'
              validate={[requireName, cleanName]}
            />
            <Field
              name='email'
              component={LabelledInput}
              label='Email'
              type='email'
              validate={[requireEmail, email]}
            />
            <Field
              name='password'
              component={LabelledInput}
              label='Password'
              type='password'
              validate={[requirePassword, password]}
            />
            <Field
              name='password_confirmation'
              component={LabelledInput}
              label='Password Confirmation'
              type='password'
              validate={[requirePasswordConfirmation, passwordsMustMatch]}
            />
          <div className='py-2'>
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

export default reduxForm({
  form: 'signup'  // a unique identifier for this form
})(SignupForm)
