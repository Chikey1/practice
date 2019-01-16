import React from 'react'
import PropTypes from 'prop-types'

function Goals (props) {
  return (
    <div className='goals-container p-3 mb-3'>
      <h5 className='text-uppercase text-center font-weight-bold text-muted'>goals</h5>
      { props.goals.map((goal, index) => {
        return <p key={goal.id} className='mb-2'>{index + 1}.&nbsp;&nbsp;{goal.description}</p>
      })}
    </div>
  )
}

Goals.propTypes = {
  goals: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  )
}

Goals.defaultProps = {
  goals: [],
}

export default Goals
