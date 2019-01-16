import React from 'react'
import PropTypes from 'prop-types'
import { navigateTo } from 'components/utility/location'
import { deleteRequest } from 'components/utility/api'

import Button from 'components/shared/button'

class BookPageList extends React.Component {
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
          <div className='row font-italic'>
            <div className='col-3'>date</div>
            <div className='col-7'>goals (preview)</div>
            <div className='col-1'>mood</div>
            <div className='col-1'></div>
          </div>
          <div className='thin-blue-decorative-line mt-2 mb-4'></div>
          { bookPage.map((page, index) => {
            return (
              <div key={index}>
                <div className='row'>
                  <div className='col-3'>
                    {page.date}
                  </div>
                  <div className='col-7'>
                    {page.goal_preview}
                  </div>
                  <div className='col-1'>{page.mood}</div>
                  <div className='col-1'>
                    <h3 className='font-weight-bold text-primary'>
                      <a href={'/books/' + book.id + '/book_pages/' + page.id}>
                        &#8594;
                      </a>
                    </h3>
                  </div>
                </div>
                <div className='thin-blue-decorative-line mt-2 mb-4'></div>
              </div>
            )
          })}
        </div>
        <div className='d-flex justify-content-center mt-3 mb-5 pt-2'>
          <Button
            color='standard-size-button btn-danger m-2 font-weight-bold'
            onClick={() => {}}
            data-toggle='modal'
            data-target='#deleteBookModal'
          >
            Delete Book
          </Button>
          <Button
            color='standard-size-button btn-primary m-2'
            onClick={() => navigateTo('/books/' + book.id + '/book_pages/new')}
          >
            New Page
          </Button>
        </div>
      </div>
    )
  }
}

BookPageList.propTypes = {
  book: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
}

export default BookPageList