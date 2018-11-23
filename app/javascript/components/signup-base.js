import React from "react"
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import SignupForm from 'components/signup-form'

export const store = createStore(combineReducers({ form: formReducer }))

export default function SignupBase (props) {
  return (
    <Provider store={store}>
      <SignupForm {...props} />
    </Provider>
  )
}
