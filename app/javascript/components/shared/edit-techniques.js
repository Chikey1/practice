import React from 'react'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer, Field } from 'redux-form'
import { required, maxLength} from 'components/utility/form-validators'

import InvisibleInput from 'components/utility/invisible-input'
import InvisibleTextarea from 'components/utility/invisible-textarea'

export const store = createStore(combineReducers({ form: formReducer }))

class EditTechniques extends React.Component {
  state = {
    techniques: this.props.techniques,
    newTechniqueCounter: 1,
  }

  addTechnique () {
    const newTechniques = this.state.techniques
    const oldCount = this.state.newTechniqueCounter
    newTechniques.push({
      id: 'n' + oldCount,
    })
    this.setState({ techniques: newTechniques, newTechniqueCounter: oldCount + 1 })
  }

  deleteTechnique (technique) {
    const pastTechniques = this.state.techniques
    const newTechniques = pastTechniques.filter((pastTechnique) => {
      return pastTechnique.id != technique.id
    })
    this.setState({ techniques: newTechniques })
    this.props.nullField('techniqueName' + technique.id)
    this.props.nullField('techniqueDescription' + technique.id)
  }

  render () {
    return (
      <div className='px-3 pt-3 my-1 page-subsection'>
        <h5 className='text-uppercase text-left font-weight-bold text-muted'>Technique</h5>
        { this.state.techniques.map((technique, index) => {
          return (
            <div key={index} className='row'>
              <div className='col-10 col-sm-3'>
                <Field
                  name={'techniqueName' + technique.id}
                  component={InvisibleInput}
                  type='text'
                  label='Name'
                  placeholder='name'
                  validate={[requireTechniqueName, maxLengthTechniqueName]}
                />
              </div>
              <div className='col-1 pt-1 d-block d-sm-none'>
                <button
                  type='button'
                  onClick={() => this.deleteTechnique(technique)}
                  className='ml-2 mt-2 close text-danger opacity-1'
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className='col-12 col-sm-8'>
                <Field
                  name={'techniqueDescription' + technique.id}
                  component={InvisibleTextarea}
                  placeholder='description'
                  label='Description'
                  validate={[requireTechniqueDescription, maxLengthTechniqueDescription]}
                />
              </div>
              <div className='col-1 pt-1 d-none d-sm-block'>
                <button
                  type='button'
                  onClick={() => this.deleteTechnique(technique)}
                  className='ml-2 mt-2 close text-danger opacity-1'
                >
                  <span>&times;</span>
                </button>
              </div>
            </div>
          )
        })}
        <div className='d-flex justify-content-center mt-2'>
          <a className='circle-icon' tabIndex='0' onClick={() => this.addTechnique()}>
            <div className='text-light'>+</div>
          </a>
        </div>
      </div>
    )
  }
}

const requireTechniqueName = required('Name')
const maxLengthTechniqueName = maxLength('Name', 15)
const requireTechniqueDescription = required('Description')
const maxLengthTechniqueDescription = maxLength('Description', 400)

export default EditTechniques