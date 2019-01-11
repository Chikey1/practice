import React from 'react'
import PropTypes from 'prop-types'

function Button (props) {
  return (
    <button
      type='button'
      className='btn btn-info'
      {...props}
    >
      {props.children}
    </button>
  )
}

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  disabled: false,
}

export default Button
