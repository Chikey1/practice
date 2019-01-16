import React from 'react'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer, Field, reduxForm } from 'redux-form'
import { required, maxLength} from 'components/utility/form-validators'

import InvisibleTextarea from 'components/utility/invisible-textarea'

export const store = createStore(combineReducers({ form: formReducer }))

function EditNotes () {
  return (
    <div className='px-3 pt-3 my-1 page-subsection'>
      <h5 className='text-uppercase text-left font-weight-bold text-muted'>Other Notes</h5>
      <Field
        name={'other_notes'}
        component={InvisibleTextarea}
        label='Notes'
        validate={[maxLengthNote]}
        rows='5'
      />
    </div>
  )
}

const maxLengthNote = maxLength('Notes', 600)

export default EditNotes