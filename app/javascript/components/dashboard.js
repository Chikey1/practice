import React from 'react'
import PropTypes from 'prop-types'

import PracticeBook from 'components/shared/practice-book'
import NewBookModal from 'components/new-book-modal'

class Dashboard extends React.Component {
  render () {
    const books = this.props.books
    return (
      <div className='bg-light text-dark h-100'>
        <div className='container pb-5'>
          <h4 className='text-muted mt-4 mb-3 p-1'>Hi {this.props.userName},</h4>
          <h2 className='font-weight-bold text-primary mb-4'>What do you want to practice today?</h2>
          <NewBookModal instrumentCategories={this.props.instrumentCategories}/>
          <div className='d-flex flex-wrap row'>
            { books.map( (book, index) => {
              return(
                <div key={index} className='p-2'>
                  <PracticeBook book={book} />
                </div>
              )
            })}
            <div className='p-2'>
              <button
                id='create-book-button'
                className='bg-light text-dark'
                data-toggle='modal'
                data-target='#newBookModal'
              >
                Add new journal
              </button>
            </div>
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
      instrument: PropTypes.string.isRequired,
      entries: PropTypes.number.isRequired,
    }).isRequired,
  ),
  userName: PropTypes.string.isRequired,
  instrumentCategories: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ),
}

export default Dashboard