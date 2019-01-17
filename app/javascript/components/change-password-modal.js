import React from 'react'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer, Field, reduxForm } from 'redux-form'
import {
  required,
  maxLength,
  passwordsMustMatch,
  password,
} from 'components/utility/form-validators'
import { post } from 'components/utility/api'
import { navigateTo } from 'components/utility/location'

import LabelledInput from 'components/utility/labelled-input'
import Alert from 'components/utility/alert'

export const store = createStore(combineReducers({ form: formReducer }))

class ChangePasswordModal extends React.Component {
  state = { serverError: false, errorMessage: null }

  onSubmit = (values) => {
    const data = { user: values }
    this.setState({ serverError: false })

    post('/user/password-change', data).then(function (response) {
      if (response.status === 200) {
        navigateTo('/settings')
      } else if (response.status === 401) {
        this.setState({ serverError: true, errorMessage: 'Current password does not match.' })
      } else {
        this.setState({ serverError: true, errorMessage: 'Could not change password.' })
        window.scroll(0,0)
      }
    }.bind(this))
  }

  render() {
    const { handleSubmit, submitting } = this.props
    const { serverError, errorMessage } = this.state
    return (
      <div className='modal fade' id='changePasswordModal' tabIndex='-1' role='dialog' aria-labelledby='changePasswordModalLabel' aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <form className='w-100' onSubmit={handleSubmit(this.onSubmit)}>
            <div className='modal-content'>
              <div className='modal-body bg-light'>
                <div className='d-flex flex-row-reverse'>
                  <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
                <h2 className='text-center text-primary py-3 font-weight-bold'>
                  - Change Password -
                </h2>
                { serverError &&
                  <Alert
                    alertType='alert-danger'
                    message={errorMessage}
                  />
                }
                <Field
                  name='current_password'
                  component={LabelledInput}
                  label='Current Password'
                  type='password'
                  validate={[requirePassword]}
                />
                <Field
                  name='password'
                  component={LabelledInput}
                  label='New Password'
                  type='password'
                  validate={[requirePassword, password, maxLengthPassword]}
                />
                <Field
                  name='password_confirmation'
                  component={LabelledInput}
                  label='New Password Confirmation'
                  type='password'
                  validate={[requirePasswordConfirmation, passwordsMustMatch]}
                />
                <div className='d-flex justify-content-center mb-2 mt-4'>
                  <button type='button' className='btn btn-secondary m-2' data-dismiss='modal'>Cancel</button>
                  <button type='submit' className='btn btn-primary m-2' disabled={submitting}>Submit</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}


const requirePassword = required('Password')
const requirePasswordConfirmation = required('Password confirmation')
const maxLengthPassword = maxLength('Password', 30)


export default reduxForm({
  form: 'change-password'  // a unique identifier for this form
})(ChangePasswordModal)
