import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

function Alert (props) {
  const classes = classnames(
    'alert',
    'alert-dismissible',
    'fade',
    'show',
    'text-left',
    props.alertType,
  )
  return (
    <div>
      <div className={classes} role="alert">
        {props.message}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  )
}

Alert.propTypes = {
  alertType: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}

export default Alert
