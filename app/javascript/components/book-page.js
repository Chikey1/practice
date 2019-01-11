import React from 'react'
import PropTypes from 'prop-types'

import ShowBookPage from 'components/shared/show-book-page'

class BookPage extends React.Component {
  render () {
    return (
      <div className='bg-light text-dark h-100'>
        <div className='book-page-container'>
          <div className='d-flex align-items-center mb-3 px-2'>
            <div className='flex-grow-1 blue-decorative-line'> </div>
            <h2 className='text-lowercase text-primary p-3 font-weight-bold'>
              {this.props.book.name}
            </h2>
            <div className='flex-grow-1 blue-decorative-line'> </div>
          </div>
          <ShowBookPage bookPage={this.props.bookPage} />
        </div>
      </div>
    )
  }
}

BookPage.propTypes = {
  book: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  bookPage: PropTypes.shape({
    date: PropTypes.string.isRequired,
  }).isRequired,
}

export default BookPage