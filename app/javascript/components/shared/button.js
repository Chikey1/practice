import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

function Button (props) {
  const buttonClasses = classnames(
    'btn',
    props.color,
  )
  return (
    <button
      type='button'
      className={buttonClasses}
      {...props}
    >
      {props.children}
    </button>
  )
}

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  color: PropTypes.string,
}

Button.defaultProps = {
  disabled: false,
  color: 'btn-primary',
}

export default Button
