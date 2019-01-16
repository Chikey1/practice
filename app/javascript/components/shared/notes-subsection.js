import React from 'react'
import PropTypes from 'prop-types'

function NotesSubsection (props) {

  return (
    <div className='px-3 pt-3 my-1 page-subsection'>
      <h5 className='text-uppercase text-left font-weight-bold text-muted'>{props.title}</h5>
      <p className='mb-0'>{props.content}</p>
    </div>
  )
}


export default NotesSubsection
