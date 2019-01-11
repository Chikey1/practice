import React from 'react'

const LabelledInput = (field) => {
  return (
    <div className='mb-3 text-left'>
      <label className='m-1'>
        {field.label}
      </label>
      <input
        {...field.input}
        type={field.type}
        className='w-100'
        name={field.name}
        disabled={!!field.meta.submitting}
      />
      { field.meta.touched && field.meta.error &&
        <div className='text-danger text-left input-error pl-1 pt-1'>
          { field.meta.error }
        </div>
      }
    </div>
  )
}

export default LabelledInput
