import React from 'react'
import PropTypes from 'prop-types'
import InvisibleInput from 'components/utility/invisible-input'
import { reducer as formReducer, Field } from 'redux-form'
import { required } from 'components/utility/form-validators'

function EditDate () {
  return (
    <div className='px-3 pt-3 my-1 w-fit-content mx-auto'>
      <Field
        name='practice_date'
        component={InvisibleInput}
        type='date'
        label='Date'
        validate={[requireDate]}
      />
    </div>
  )
}

const requireDate = required('Date')

export default EditDate
