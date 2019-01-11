import React from 'react'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer, Field, reduxForm } from 'redux-form'
import { required, maxLength} from 'components/utility/form-validators'
import { post } from 'components/utility/api'
import { navigateTo } from 'components/utility/location'

import LabelledInput from 'components/utility/labelled-input'
import SelectDropdown from 'components/utility/select-dropdown'
import Alert from 'components/utility/alert'

export const store = createStore(combineReducers({ form: formReducer }))

class NewBookModal extends React.Component {
  state = { serverError: false }

  onSubmit = (values) => {
    const data = { book: values }
    this.setState({ serverError: false })

    post('/books', data).then(function (response) {
      if (response.status === 200) {
        navigateTo('/')
      } else {
        this.setState({ serverError: true })
        window.scroll(0,0)
      }
    }.bind(this))
  }

  render() {
    const { handleSubmit, submitting, instrumentCategories } = this.props
    const { serverError } = this.state
    return (
      <div className='modal fade' id='newBookModal' tabIndex='-1' role='dialog' aria-labelledby='newBookModalLabel' aria-hidden='true'>
        <div className='modal-dialog' role='document'>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <div className='modal-content'>
              <div className='modal-body'>
                <div className='d-flex justify-content-between'>
                  <h5 className='modal-title' id='newBookModalLabel'>New Practice Book</h5>
                  <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
                { serverError &&
                  <Alert
                    alertType='alert-danger'
                    message='Could not create book.'
                  />
                }
                <Field
                  name='name'
                  component={LabelledInput}
                  type='text'
                  label='Name'
                  validate={[requireName, maxLengthName]}
                />
                <Field
                  name='instrument'
                  component={SelectDropdown}
                  type='select'
                  label='Icon'
                  validate={requireInstrument}
                >
                  <option value=''>Choose an instrument</option>
                  { instrumentCategories.map((category, index) => {
                    return <option key={index} value={category}>{category}</option>
                  })}
                </Field>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-secondary' data-dismiss='modal'>Cancel</button>
                <button type='submit' className='btn btn-primary' disabled={submitting}>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}


const requireName = required('Name')
const maxLengthName = maxLength('Name', 12)
const requireInstrument = required('Instrument')

export default reduxForm({
  form: 'newBook'  // a unique identifier for this form
})(NewBookModal)
