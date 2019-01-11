import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import BookPage from 'components/book-page.js'

const store = createStore(combineReducers({ form: formReducer }))

const rootElement = document.getElementById('book-page-root')
const props = JSON.parse(rootElement.getAttribute('data-props'))

render(
	<Provider store={store}>
		<BookPage
			book={props.book}
			bookPage={props.book_page}
		/>
	</Provider>,
	rootElement
);