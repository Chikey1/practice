import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import NewBookPage from 'components/new-book-page'

const store = createStore(combineReducers({ form: formReducer }))

const rootElement = document.getElementById('new-book-page-root')
const props = JSON.parse(rootElement.getAttribute('data-props'))

render(
	<Provider store={store}>
		<NewBookPage
			book={props.book}
		/>
	</Provider>,
	rootElement
);