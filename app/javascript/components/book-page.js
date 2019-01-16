import React from 'react'
import PropTypes from 'prop-types'
import { navigateTo } from 'components/utility/location'
import { deleteRequest } from 'components/utility/api'

import ShowBookPage from 'components/shared/show-book-page'
import Button from 'components/shared/button'

class BookPage extends React.Component {
  state = { deleteBookError: false }

  deleteBook() {
    this.setState({ deleteBookError: false })

    deleteRequest('/books/' + this.props.book.id, this.props.book.id ).then(function (response) {
      if (response.status === 200) {
        navigateTo('/')
      } else {
        this.setState({ deleteBookError: true })
      }
    }.bind(this))
  }


  renderDeleteModal() {
    return (
      <div className='modal fade' id='deleteBookModal' tabIndex='-1' role='dialog' aria-labelledby='deleteBookModalLabel' aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-body bg-light'>
              <div className='d-flex flex-row-reverse'>
                <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <h2 className='text-center text-primary py-3 font-weight-bold'>
                - Delete Book -
              </h2>
              { this.state.deleteBookError &&
                <Alert
                  alertType='alert-danger'
                  message='Could not make changes.'
                />
              }
              <div>
                <p className='text-center px-2'>
                  Are you sure you want to delete "{this.props.book.name}"?
                </p>
                <div className='d-flex justify-content-center mb-2 mt-4'>
                  <button type='button' className='btn btn-secondary m-2' data-dismiss='modal'>Cancel</button>
                  <button onClick={() => this.deleteBook() } className='btn btn-primary m-2'>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render () {
    const { bookPage, book } = this.props
    return (
      <div className='bg-light text-dark h-100'>
        { this.renderDeleteModal() }
        <div className='book-page-container'>
          <div className='d-flex align-items-center mb-3 px-2'>
            <div className='flex-grow-1 blue-decorative-line'> </div>
            <h2 className='text-lowercase text-primary p-3 font-weight-bold'>
              {book.name}
            </h2>
            <div className='flex-grow-1 blue-decorative-line'> </div>
          </div>
          <ShowBookPage book={book} bookPage={bookPage} />
        </div>
        <div className='d-flex justify-content-center text-dark'>
          { bookPage.previous_page &&
            <a href={'/books/' + book.id + '/book_pages/' + bookPage.previous_page}>
              <h4>&#8592;</h4>
            </a>
          }
          <h5 className='mx-3'>{ bookPage.current_page }</h5>
          { bookPage.next_page &&
            <a href={'/books/' + book.id + '/book_pages/' + bookPage.next_page}>
              <h4>&#8594;</h4>
            </a>
          }
        </div>
        <div className='d-flex justify-content-center flex-row-reverse flex-wrap mt-3 mb-5 pt-2'>
          <Button
            color='standard-size-button btn-primary m-2'
            onClick={() => navigateTo('/books/' + book.id + '/book_pages/new')}
          >
            New Page
          </Button>
          <Button
            color='standard-size-button btn-secondary m-2 font-weight-bold'
            onClick={() => navigateTo('/books/' + book.id + '/book_pages')}
          >
            List Pages
          </Button>
          <Button
            color='standard-size-button btn-danger m-2 font-weight-bold'
            onClick={() => {}}
            data-toggle='modal'
            data-target='#deleteBookModal'
          >
            Delete Book
          </Button>
        </div>
      </div>
    )
  }
}

BookPage.propTypes = {
  book: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  bookPage: PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    goals: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      }).isRequired,
    ),
    repetoire: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      }).isRequired,
    ),
    techniques: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      }).isRequired,
    ),
  }).isRequired,
}

export default BookPage