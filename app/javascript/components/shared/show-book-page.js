import React from 'react'
import PropTypes from 'prop-types'
import { deleteRequest } from 'components/utility/api'
import { navigateTo } from 'components/utility/location'

import Goals from 'components/shared/goals'
import NotesSubsection from 'components/shared/notes-subsection'
import TechniqueSubsection from 'components/shared/technique-subsection'
import RepetoireSubsection from 'components/shared/repetoire-subsection'
import Mood from 'components/shared/mood'
import Button from 'components/shared/button'
import EditBookPage from 'components/shared/edit-book-page'
import Alert from 'components/utility/alert'

class ShowBookPage extends React.Component {
  state = { display: 'show', deleteError: false }

  setShow = () => {
    this.setState({ display: 'show' })
  }

  setDelete () {
    this.setState({ display: 'delete' })
  }

  setEdit () {
    this.setState({ display: 'edit' })
  }

  deletePage () {
    this.setState({ deleteError: false })
    deleteRequest(
      '/books/' + this.props.book.id + '/book_pages/' + this.props.bookPage.id
    ).then(function (response) {
      if (response.status === 200) {
        navigateTo('/books/' + this.props.book.id )
      } else {
        this.setState({ deleteError: true })
        window.scroll(0,0)
      }
    }.bind(this))
  }

  render () {
    const { bookPage, book } = this.props
    const { deleteError } = this.state

    switch (this.state.display) {
      case 'edit':
        return (
          <EditBookPage book={book} bookPage={bookPage} cancel={this.setShow}/>
        )
      case 'delete':
        return (
          <div className='book-page bg-light p-4 mb-5'>
            <h6 className='font-italic text-center mb-3'>{bookPage.date}</h6>
            { deleteError &&
              <Alert
                alertType='alert-danger'
                message='Could not delete page.'
              />
            }
            <div className='text-center pb-2 px-2 pt-4'>Are you sure you want to delete this page?</div>
            <div className='d-flex justify-content-center mt-4 pt-2'>
              <Button
                color='standard-size-button btn-secondary m-2 font-weight-bold'
                onClick={this.setShow}
              >
                Cancel
              </Button>
              <Button
                color='standard-size-button btn-primary m-2'
                onClick={() => this.deletePage()}
              >
                Delete
              </Button>
            </div>
          </div>
        )
      default: // case 'show'
        return (
          <div className='book-page bg-light p-4 mb-5'>
            <h6 className='font-italic text-center mb-3'>{bookPage.date}</h6>
            <Goals goals={bookPage.goals} />
            <TechniqueSubsection content={bookPage.techniques} />
            <RepetoireSubsection content={bookPage.repetoire} />
            <NotesSubsection title='Other Notes' content={bookPage.other_notes}/>
            <Mood selectedMood={bookPage.mood} />
            <div className='d-flex justify-content-center mt-4 pt-2'>
              <Button
                color='standard-size-button btn-secondary m-2 font-weight-bold'
                onClick={() => this.setDelete()}
              >
                Delete
              </Button>
              <Button
                color='standard-size-button btn-primary m-2'
                onClick={() => this.setEdit()}
              >
                Edit
              </Button>
            </div>
          </div>
        )
    }
  }
}

ShowBookPage.propTypes = {
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

export default ShowBookPage
