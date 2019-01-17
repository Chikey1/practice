import React from 'react'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer, Field, reduxForm } from 'redux-form'
import { required, maxLength} from 'components/utility/form-validators'
import { post } from 'components/utility/api'
import { navigateTo } from 'components/utility/location'

import LabelledInput from 'components/utility/labelled-input'
import Alert from 'components/utility/alert'

export const store = createStore(combineReducers({ form: formReducer }))

class ChangeNameModal extends React.Component {
  state = { serverError: false }

  onSubmit = (values) => {
    const data = { user: values }
    this.setState({ serverError: false })

    post('/user/update', data).then(function (response) {
      if (response.status === 200) {
        navigateTo('/settings')
      } else {
        this.setState({ serverError: true })
        window.scroll(0,0)
      }
    }.bind(this))
  }

  render() {
    const { handleSubmit, submitting } = this.props
    const { serverError } = this.state
    return (
      <div className='modal fade' id='changeNameModal' tabIndex='-1' role='dialog' aria-labelledby='changeNameModalLabel' aria-hidden='true'>
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
                  - Update Name -
                </h2>
                { serverError &&
                  <Alert
                    alertType='alert-danger'
                    message='Could not change name.'
                  />
                }
                <Field
                  name='name'
                  component={LabelledInput}
                  type='text'
                  label='New Name'
                  validate={[requireName, maxLengthName]}
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


const requireName = required('Name')
const maxLengthName = maxLength('Name', 50)

export default reduxForm({
  form: 'change-name'  // a unique identifier for this form
})(ChangeNameModal)
