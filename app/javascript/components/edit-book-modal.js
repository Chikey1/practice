import React from 'react'
import { connect } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer, Field, reduxForm } from 'redux-form'
import { required, maxLength} from 'components/utility/form-validators'
import { post, deleteRequest } from 'components/utility/api'
import { navigateTo } from 'components/utility/location'

import InvisibleInput from 'components/utility/invisible-input'
import InvisibleSelectDropdown from 'components/utility/invisible-select-dropdown'
import Alert from 'components/utility/alert'

export const store = createStore(combineReducers({ form: formReducer }))

class EditBookModal extends React.Component {
  state = { serverError: false, confirmBook: null }

  onSubmit = (values) => {
    const formattedValues = this.formatValues(values)
    this.setState({ serverError: false })

    post('/books/update', formattedValues).then(function (response) {
      if (response.status === 200) {
        navigateTo('/')
      } else {
        this.setState({ serverError: true })
        window.scroll(0,0)
      }
    }.bind(this))
  }

  formatValues = (values) => {
    const keys = Object.keys(values)
    return keys.map((key) => {
      if (key.startsWith('name')) {
        const id = key.slice(4)
        return {
          id: id,
          name: values[key],
          instrument: values['instrument' + id],
        }
      }
    }).filter(function (el) {
      return el != null;
    })
  }

  confirmDelete (book) {
    this.setState({ confirmBook: book })
  }

  back () {
    this.setState({ confirmBook: null })
  }

  deleteBook() {
    this.setState({ serverError: false })

    deleteRequest('/books/' + this.state.confirmBook.id, this.state.confirmBook.id ).then(function (response) {
      if (response.status === 200) {
        navigateTo('/')
      } else {
        this.setState({ serverError: true })
        window.scroll(0,0)
      }
    }.bind(this))
  }

  render() {
    const { handleSubmit, submitting, instrumentCategories, books } = this.props
    const { serverError, confirmBook } = this.state
    return (
      <div className='modal fade' id='editBookModal' tabIndex='-1' role='dialog' aria-labelledby='editBookModalLabel' aria-hidden='true'>
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
                  - My Books -
                </h2>
                { serverError &&
                  <Alert
                    alertType='alert-danger'
                    message='Could not make changes.'
                  />
                }
                { confirmBook ?
                  <div>
                    <p className='text-center px-2'>
                      Are you sure you want to delete {confirmBook.name} ({confirmBook.entries} entries)?
                    </p>
                    <div className='d-flex justify-content-center mb-2 mt-4'>
                      <button type='button' className='btn btn-secondary m-2' onClick={() => this.back() }>Back</button>
                      <button onClick={() => this.deleteBook() } className='btn btn-primary m-2' disabled={submitting}>
                        Delete
                      </button>
                    </div>
                  </div> :
                  <div>
                    <div className='d-none d-sm-block'>
                      <div className='row pr-1 mr-4 mb-2 font-italic'>
                        <div className='col-6 text-center'>
                          title
                        </div>
                        <div className='col-6 text-center'>
                          icon
                        </div>
                      </div>
                    </div>
                    { books.map((book, index) => {
                      return (
                        <div key={index}>
                          <div className='d-flex align-items-start'>
                            <div className='row flex-grow-1'>
                              <div className='col-12 col-sm-6'>
                                <Field
                                  name={'name' + book.id}
                                  component={InvisibleInput}
                                  type='text'
                                  label='Title'
                                  validate={[requireName, maxLengthName]}
                                />
                              </div>
                              <div className='col-12 col-sm-6'>
                                <Field
                                  name={'instrument' + book.id}
                                  component={InvisibleSelectDropdown}
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
                            </div>
                            <button type='button' onClick={() => this.confirmDelete(book)} className='ml-2 mt-2 close text-danger opacity-1'>
                              <span>&times;</span>
                            </button>
                          </div>
                          <div className='blue-decorative-line d-block d-sm-none m-4 mr-5'></div>
                        </div>
                      )
                    })}
                    <div className='d-flex justify-content-center mb-2 mt-4'>
                      <button type='button' className='btn btn-secondary m-2' data-dismiss='modal'>Cancel</button>
                      <button type='submit' className='btn btn-primary m-2' disabled={submitting}>Update</button>
                    </div>
                  </div>
                }
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

let EditBookForm = reduxForm({
  form: 'newBook'  // a unique identifier for this form
})(EditBookModal)


export default connect((_state, ownProps) => {
  const bookFields = ownProps.books.reduce(function(map, obj) {
    map['name' + obj.id] = obj.name
    map['instrument' + obj.id] = obj.instrument
    return map
  }, {})

  return { initialValues: bookFields }
})(EditBookForm)