import React from 'react'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer, Field, reduxForm } from 'redux-form'
import { required, maxLength} from 'components/utility/form-validators'

import InvisibleInput from 'components/utility/invisible-input'

export const store = createStore(combineReducers({ form: formReducer }))

class EditGoals extends React.Component {
  state = {
    goals: this.props.goals,
    newGoalCounter: 1,
  }

  addGoal () {
    const newGoals = this.state.goals
    const oldCount = this.state.newGoalCounter
    newGoals.push({
      id: 'n' + oldCount,
    })
    this.setState({ goals: newGoals, newGoalCounter: oldCount + 1 })
  }

  deleteGoal (goal) {
    const pastGoals = this.state.goals
    const newGoals = pastGoals.filter((pastGoal) => {
      return pastGoal.id != goal.id
    })
    this.setState({ goals: newGoals })
    this.props.nullField('goal' + goal.id)
  }

  render () {
    return (
      <div className='goals-container p-3 mb-3'>
        <h5 className='text-uppercase text-center font-weight-bold text-muted'>goals</h5>
        { this.state.goals.map((goal, index) => {
          return (
            <div key={index} className='row'>
              <div className='col-1 text-center pt-2'>{index + 1}.</div>
              <div className='col-10'>
                <Field
                  name={'goal' + goal.id}
                  component={InvisibleInput}
                  type='text'
                  label='Goal'
                  validate={[requireGoal, maxLengthGoal]}
                />
              </div>
              <div className='col-12  col-sm-1 d-flex justify-content-center align-items-start pt-1'>
                <button
                  type='button'
                  onClick={() => this.deleteGoal(goal)}
                  className='ml-2 mt-2 close text-danger opacity-1'
                >
                  <span>&times;</span>
                </button>
              </div>
            </div>
          )
        })}
        <div className='d-flex justify-content-center mt-2'>
          <a className='circle-icon' tabIndex='0' onClick={() => this.addGoal()}>
            <div className='text-light'>+</div>
          </a>
        </div>
      </div>
    )
  }
}

const requireGoal = required('Goal')
const maxLengthGoal = maxLength('Goal', 200)


export default EditGoals