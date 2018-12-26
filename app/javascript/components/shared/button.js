import React from 'react'
import PropTypes from 'prop-types'

function Button (props) {
  return (
    <button
      disabled={props.disabled}
      type='button'
      class='btn btn-info'
    >
      {props.children}
    </button>
  )
}

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

Button.defaultProps = {
  disabled: false,
}

export default Button
