import React from 'react'
import { render } from 'react-dom'
import Library from './Library'

// Array of data called book list
let bookList = [
	{"title": "El otoño del patriarca", "author": "Gabriel García Márquez", "pages": 250},
	{"title": "Hunger", "author": "Roxane Gay", "pages": 320},
	{"title": "The Sun Also Rises", "author": "Ernest Hemingway", "pages": 260},
	{"title": "White Teeth", "author": "Zadie Smith", "pages": 480},
	{"title": "Cat's Cradle", "author": "Kurt Vonnegut", "pages": 304}
]


// Library is the main component
// Pass the booklist to the component using the parameter books
render(
	<Library books={bookList} />, 
	document.getElementById('root')
)