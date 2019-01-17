import React from 'react'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer, Field, reduxForm } from 'redux-form'
import { required } from 'components/utility/form-validators'
import { deleteRequest } from 'components/utility/api'
import { navigateTo } from 'components/utility/location'

import LabelledInput from 'components/utility/labelled-input'
import Alert from 'components/utility/alert'

export const store = createStore(combineReducers({ form: formReducer }))

class DeleteAccountModal extends React.Component {
  state = { serverError: false, errorMessage: null }

  onSubmit = (values) => {
    const data = { user: values }
    this.setState({ serverError: false })

    deleteRequest('/users/' + this.props.user.id, data).then(function (response) {
      if (response.status === 200) {
        navigateTo('/')
      } else if (response.status === 401) {
        this.setState({ serverError: true, errorMessage: 'Current password does not match.' })
      } else {
        this.setState({ serverError: true, errorMessage: 'Could not delete account.' })
        window.scroll(0,0)
      }
    }.bind(this))
  }

  render() {
    const { handleSubmit, submitting } = this.props
    const { serverError, errorMessage } = this.state
    return (
      <div className='modal fade' id='deleteAccountModal' tabIndex='-1' role='dialog' aria-labelledby='deleteAccountModalLabel' aria-hidden='true'>
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
                  - Delete Account -
                </h2>
                { serverError &&
                  <Alert
                    alertType='alert-danger'
                    message={errorMessage}
                  />
                }
                <Field
                  name='password'
                  component={LabelledInput}
                  label='Please confirm by entering your current password:'
                  type='password'
                  validate={[requirePassword]}
                />
                <div className='d-flex justify-content-center mb-2 mt-4'>
                  <button type='button' className='btn btn-secondary m-2' data-dismiss='modal'>Cancel</button>
                  <button type='submit' className='btn btn-danger m-2' disabled={submitting}>Delete</button>
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

export default reduxForm({
  form: 'delete-account'  // a unique identifier for this form
})(DeleteAccountModal)
