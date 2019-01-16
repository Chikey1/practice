import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { post } from 'components/utility/api'

import EditGoals from 'components/shared/edit-goals'
import EditTechniques from 'components/shared/edit-techniques'
import EditRepetoire from 'components/shared/edit-repetoire'
import EditNotes from 'components/shared/edit-notes'
import EditMood from 'components/shared/edit-mood'
import EditDate from 'components/shared/edit-date'
import Button from 'components/shared/button'
import InvisibleInput from 'components/utility/invisible-input'
import Alert from 'components/utility/alert'


class EditBookPage extends React.Component {
  state = {
    serverError: false,
    selectedMood: this.props.bookPage.mood,
  }

  changeMood = (value) => {
    this.setState({ selectedMood: value })
  }

  onSubmit = (values) => {
    const { book, bookPage } = this.props
    const formattedValues = this.formatValues(values)
    this.setState({ serverError: false })

    post('/books/' + book.id + '/book_pages/' + bookPage.id, formattedValues).then(function (response) {
      if (response.status === 200) {
        location.reload()
      } else {
        this.setState({ serverError: true })
        window.scroll(0,0)
      }
    }.bind(this))
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

  nullField = (fieldName) => {
    this.props.change(fieldName, null)
  }

  render() {
    const { serverError } = this.state
    const { bookPage, handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className='book-page bg-light p-4 mb-5'>
          {/* <h6 className='font-italic text-center mb-3'>{bookPage.date}</h6> */}
          { serverError &&
            <Alert
              alertType='alert-danger'
              message='Could not make changes.'
            />
          }
          <EditDate />
          <EditGoals goals={bookPage.goals} nullField={this.nullField}/>
          <EditTechniques techniques={bookPage.techniques} nullField={this.nullField}/>
          <EditRepetoire repetoire={bookPage.repetoire} nullField={this.nullField} />
          <EditNotes />
          <EditMood selectedMood={bookPage.mood} onChange={this.changeMood} />

          {/* <Mood selectedMood={bookPage.mood} /> */}
          <div className='d-flex flex-wrap flex-row-reverse justify-content-center mt-4 pt-2'>
            <Button
              color='standard-size-button btn-primary m-2'
              type='submit'
            >
              Save
            </Button>
            <Button
              color='standard-size-button btn-secondary m-2 font-weight-bold'
              onClick={this.props.cancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    )
  }
}

let EditBookPageForm = reduxForm({
  form: 'edit-book-page'  // a unique identifier for this form
})(EditBookPage)

export default connect((_state, ownProps) => {
  const goalFields = ownProps.bookPage.goals.reduce(function(map, obj) {
    map['goal' + obj.id] = obj.description
    return map
  }, {})

  const techniqueFields = ownProps.bookPage.techniques.reduce(function(map, obj) {
    map['techniqueName' + obj.id] = obj.name
    map['techniqueDescription' + obj.id] = obj.description
    return map
  }, {})

  const repetoireFields = ownProps.bookPage.repetoire.reduce(function(map, obj) {
    map['pieceTitle' + obj.id] = obj.title
    map['pieceDescription' + obj.id] = obj.description
    return map
  }, {})

  const mergedFields = {
    ...goalFields,
    ...techniqueFields,
    ...repetoireFields,
    other_notes: ownProps.bookPage.other_notes,
    practice_date: ownProps.bookPage.form_date,
  }

  return { initialValues: mergedFields }
})(EditBookPageForm)