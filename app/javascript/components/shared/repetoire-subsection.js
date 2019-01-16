import React from 'react'
import PropTypes from 'prop-types'

function RepetoireSubsection (props) {
  return (
    <div className='px-3 pt-3 my-1 page-subsection'>
      <h5 className='text-uppercase text-left font-weight-bold text-muted'>Repetoire</h5>
      { props.content.map((c, index) => {
        return <div className='row' key={index} >
          <div className='col-2'>{c.title}</div>
          <div className='col-10'>{c.description}</div>
        </div>
      })}
    </div>
  )
}

RepetoireSubsection.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
}

RepetoireSubsection.defaultProps = {
  content: [],
}

export default RepetoireSubsection
