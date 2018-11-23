import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import SignupForm from 'components/signup-form'

const store = createStore(combineReducers({ form: formReducer }))

render(
    <Provider store={store}>
        <SignupForm/>
    </Provider>,
    document.getElementById('root')
);