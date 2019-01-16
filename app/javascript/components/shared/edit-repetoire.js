import React from 'react'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer, Field, reduxForm } from 'redux-form'
import { required, maxLength} from 'components/utility/form-validators'

import InvisibleInput from 'components/utility/invisible-input'
import InvisibleTextarea from 'components/utility/invisible-textarea'

export const store = createStore(combineReducers({ form: formReducer }))

class EditRepetoire extends React.Component {
  state = {
    repetoire: this.props.repetoire,
    newPieceCounter: 1,
  }

  addPiece () {
    const newRepetoire = this.state.repetoire
    const oldCount = this.state.newPieceCounter
    newRepetoire.push({
      id: 'n' + oldCount,
    })
    this.setState({ repetoire: newRepetoire, newPieceCounter: oldCount + 1 })
  }

  deletePiece (piece) {
    const pastRepetoire = this.state.repetoire
    const newRepetoire = pastRepetoire.filter((pastPiece) => {
      return pastPiece.id != piece.id
    })
    this.setState({ repetoire: newRepetoire })
    this.props.nullField('pieceTitle' + piece.id)
    this.props.nullField('pieceDescription' + piece.id)
  }

  render () {
    return (
      <div className='px-3 pt-3 my-1 page-subsection'>
        <h5 className='text-uppercase text-left font-weight-bold text-muted'>Repetoire</h5>
        { this.state.repetoire.map((piece, index) => {
          return (
            <div key={index} className='row'>
              <div className='col-10 col-sm-3'>
                <Field
                  name={'pieceTitle' + piece.id}
                  component={InvisibleInput}
                  type='text'
                  label='Title'
                  placeholder='title'
                  validate={[requirePieceTitle, maxLengthPieceTitle]}
                />
              </div>
              <div className='col-1 pt-1 d-block d-sm-none'>
                <button
                  type='button'
                  onClick={() => this.deletePiece(piece)}
                  className='ml-2 mt-2 close text-danger opacity-1'
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className='col-12 col-sm-8'>
                <Field
                  name={'pieceDescription' + piece.id}
                  component={InvisibleTextarea}
                  placeholder='description'
                  label='Description'
                  validate={[requirePieceDescription, maxLengthPieceDescription]}
                />
              </div>
              <div className='col-1 pt-1 d-none d-sm-block'>
                <button
                  type='button'
                  onClick={() => this.deletePiece(piece)}
                  className='ml-2 mt-2 close text-danger opacity-1'
                >
                  <span>&times;</span>
                </button>
              </div>
            </div>
          )
        })}
        <div className='d-flex justify-content-center mt-2'>
          <a className='circle-icon' tabIndex='0' onClick={() => this.addPiece()}>
            <div className='text-light'>+</div>
          </a>
        </div>
      </div>
    )
  }
}

const requirePieceTitle = required('Title')
const maxLengthPieceTitle = maxLength('Title', 30)
const requirePieceDescription = required('Description')
const maxLengthPieceDescription = maxLength('Description', 400)

export default EditRepetoire