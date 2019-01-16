import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import BookPageList from 'components/book-page-list'

const store = createStore(combineReducers({ form: formReducer }))

const rootElement = document.getElementById('book-page-index-root')
const props = JSON.parse(rootElement.getAttribute('data-props'))

render(
	<Provider store={store}>
		<BookPageList
			book={props.book}
			bookPage={props.bookPages}
		/>
	</Provider>,
	rootElement
);