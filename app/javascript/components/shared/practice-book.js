import React from 'react'
import PropTypes from 'prop-types'

function PracticeBook (props) {
  return (
    <div className='practice-book-container'>
      <div className='practice-book-green d-flex justify-content-center align-items-center'>
        <div className='practice-book-title'>
          <h4>{props.book.name}</h4>
        </div>
      </div>
    </div>
  )
}

PracticeBook.propTypes = {
  book: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
}

export default PracticeBook
