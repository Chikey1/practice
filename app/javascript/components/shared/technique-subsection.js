import React from 'react'
import PropTypes from 'prop-types'

function TechniqueSubsection (props) {
  return (
    <div className='px-3 pt-3 my-1 page-subsection'>
      <h5 className='text-uppercase text-left font-weight-bold text-muted'>Technique</h5>
      { props.content.map((c, index) => {
        return <div className='row' key={index} >
          <div className='col-12 col-sm-2 font-weight-bold'>{c.name}</div>
          <div className='col-12 col-sm-10'>{c.description}</div>
        </div>
      })}
    </div>
  )
}

TechniqueSubsection.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
}

TechniqueSubsection.defaultProps = {
  content: [],
}

export default TechniqueSubsection
