import React from 'react'
import PropTypes from 'prop-types'

import PracticeBook from 'components/shared/practice-book'
import Button from 'components/shared/button'

class Dashboard extends React.Component {
  render () {
    const books = this.props.books
    return (
      <div className='bg-light text-dark h-100'>
        <div className='container'>
          <h2 className='dashboard-title text-center mt-4 mb-3 p-1'>Your Books</h2>
          <div className='row'>
            { books.map( (book, index) => {
              return(
                <div key={index} className='p-2 col-6 col-sm-4 col-md-3 col-lg-2'>
                  <PracticeBook book={book} />
                </div>
              )
            })}
          </div>
          <div className='d-flex justify-content-center py-5'>
            <Button onClick={() => {}}>
              Create a book
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  ),
}

export default Dashboard