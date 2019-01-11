import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import Dashboard from 'components/dashboard'

const store = createStore(combineReducers({ form: formReducer }))

const rootElement = document.getElementById('dashboard-root')
const props = JSON.parse(rootElement.getAttribute('data-props'))

render(
	<Provider store={store}>
		<Dashboard
			books={props.books}
			userName={props.user_name}
			instrumentCategories={props.instrument_categories}
		/>
	</Provider>,
	rootElement
);