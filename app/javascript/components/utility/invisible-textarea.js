import React from 'react'

const InvisibleTextarea = (field) => {
  return (
    <div className='mb-3 text-left'>
      <textarea
        {...field.input}
        className='w-100 invisible-input'
        name={field.name}
        disabled={!!field.meta.submitting}
        placeholder={field.placeholder}
        rows={field.rows || '3'}
      />
      { field.meta.touched && field.meta.error &&
        <div className='text-danger text-left input-error pl-1 pt-1'>
          { field.meta.error }
        </div>
      }
    </div>
  )
}

export default InvisibleTextarea
