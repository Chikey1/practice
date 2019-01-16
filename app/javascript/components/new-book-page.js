import React from 'react'
import PropTypes from 'prop-types'
import { navigateTo } from 'components/utility/location'
import { reduxForm } from 'redux-form'
import { post } from 'components/utility/api'

import EditGoals from 'components/shared/edit-goals'
import EditTechniques from 'components/shared/edit-techniques'
import EditRepetoire from 'components/shared/edit-repetoire'
import EditNotes from 'components/shared/edit-notes'
import EditMood from 'components/shared/edit-mood'
import EditDate from 'components/shared/edit-date'
import Button from 'components/shared/button'
import Alert from 'components/utility/alert'

class NewBookPage extends React.Component {
  state = { selectedMood: null, serverError: false, disableSave: false }

  changeMood = (value) => {
    this.setState({ selectedMood: value })
  }

  onSubmit = (values) => {
    const { book } = this.props
    const formattedValues = this.formatValues(values)
    this.setState({ serverError: false, disableSave: true })

    post('/books/' + book.id + '/book_pages', formattedValues).then(function (response) {
      if (response.status === 200) {
        navigateTo(response.url)
      } else {
        this.setState({ serverError: true, disableSave: false })
        window.scroll(0,0)
      }
    }.bind(this))
  }

  nullField = (fieldName) => {
    this.props.change(fieldName, null)
  }

  formatValues = (values) => {
    const keys = Object.keys(values)
    const goals = []
    const techniques = []
    const repetoire = []
    keys.map((key) => {
      if (key.startsWith('goal')) {
        const id = key.slice(4)
        goals.push({
          id: id,
          description: values[key],
        })
      } else if (key.startsWith('techniqueName')) {
        const id = key.slice(13)
        techniques.push({
          id: id,
          name: values[key],
          description: values['techniqueDescription' + id]
        })
      } else if (key.startsWith('pieceTitle')) {
        const id = key.slice(10)
        repetoire.push({
          id: id,
          title: values[key],
          description: values['pieceDescription' + id]
        })
      }
    })

    return {
      goals: goals,
      techniques: techniques,
      repetoire: repetoire,
      other_notes: values['other_notes'],
      mood: this.state.selectedMood,
      practice_date: values['practice_date'],
    }
  }

  render () {
    const { serverError } = this.state
    const { handleSubmit } = this.props
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
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <div className='book-page bg-light p-4 mb-5'>
              { serverError &&
                <Alert
                  alertType='alert-danger'
                  message='Could not make changes.'
                />
              }
              <EditDate />
              <EditGoals goals={[]} nullField={this.nullField}/>
              <EditTechniques techniques={[]} nullField={this.nullField}/>
              <EditRepetoire repetoire={[]} nullField={this.nullField} />
              <EditNotes />
              <EditMood selectedMood={null} onChange={this.changeMood} />
              <div className='d-flex flex-wrap flex-row-reverse justify-content-center mt-4 pt-2'>
                <Button
                  color='standard-size-button btn-primary m-2'
                  type='submit'
                  disabled={this.state.disableSave}
                >
                  Save
                </Button>
                <Button
                  color='standard-size-button btn-secondary m-2 font-weight-bold'
                  onClick={() => navigateTo('/')}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

NewBookPage.propTypes = {
  book: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
}

export default reduxForm({
  form: 'new-book-page'  // a unique identifier for this form
})(NewBookPage)