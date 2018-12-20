import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import Dashboard from 'components/dashboard'

const store = createStore(combineReducers({ form: formReducer }))

render(
    <Provider store={store}>
        <Dashboard/>
    </Provider>,
    document.getElementById('dashboard-root')
);