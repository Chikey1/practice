import React from 'react'

const SelectDropdown = (field) => {
  return (
    <div className='mb-3 text-left'>
      <label className='m-1'>
        {field.label}
      </label>
      <div>
        <select
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

export default SelectDropdown
