import React from 'react'

const InvisibleSelectDropdown = (field) => {
  return (
    <div className='mb-3 text-left'>
      <div>
        <select
          className='invisible-select'
          name={field.name}
          disabled={!!field.meta.submitting}
          {...field.input}
        >
          {field.children}
        </select>
      </div>
      { field.meta.touched && field.meta.error &&
        <div className='text-danger text-left input-error pl-1 pt-1'>
          { field.meta.error }
        </div>
      }
    </div>
  )
}

export default InvisibleSelectDropdown
