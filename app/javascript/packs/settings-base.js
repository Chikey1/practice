import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import Settings from 'components/settings'

const store = createStore(combineReducers({ form: formReducer }))

const rootElement = document.getElementById('settings-root')
const props = JSON.parse(rootElement.getAttribute('data-props'))

render(
	<Provider store={store}>
    	<Settings user={props.user} />
	</Provider>,
	rootElement
);