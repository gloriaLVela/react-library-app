import React from 'react'
import { render } from 'react-dom'

// Array of data called book list
let bookList = [
	{"title": "El otoño del patriarca", "author": "Gabriel García Márquez", "pages": 250},
	{"title": "Hunger", "author": "Roxane Gay", "pages": 320},
	{"title": "The Sun Also Rises", "author": "Ernest Hemingway", "pages": 260},
	{"title": "White Teeth", "author": "Zadie Smith", "pages": 480},
	{"title": "Cat's Cradle", "author": "Kurt Vonnegut", "pages": 304}
]

const Book = ({title, author, pages, freeBookmark}) => {
	return (
		<section>
			<h2>{title}</h2>
			<p>by: {author}</p>
			<p>Pages: {pages} pages</p>
			<p>Free Bookmark Today: {freeBookmark ? 'yes!': 'no!'}</p>
		</section>
	)
}

// Wrap multiple components inside one DIV
// 
// Map the data in books into the Book component
const Hiring = () => 
	<div>
		<p>The library is hiring. Go to www.library.com/jobs for more.</p>
	</div>

const NotHiring = () => 
	<div>
		<p>The library is not hiring. Check back later for more info.</p>
	</div>

class Library extends React.Component {
	
	state = { 
		open: true,
		freeBookmark: false,
		hiring: true
	}

	// Component lifecycle methods are only available when using class syntax, so you can't use them with function components.
	// More information http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
	componentDidMount() {
		console.log("The component is now mounted!")
	}

	componentDidUpdate() {
		console.log("The component just updated")
	}

	toggleOpenClosed = () => {
		this.setState(prevState => ({
			open: !prevState.open
		}))
	}
	render() {
		const { books } = this.props
		return (
			<div>
			
				{this.state.hiring ? <Hiring /> : <NotHiring />}
				<h1>The library is {this.state.open ? 'open' : 'closed'}</h1>
				<button onClick={this.toggleOpenClosed}>Change</button>
				{books.map(
					(book, i) => 
						<Book 
							key={i}
							title={book.title} 
							author={book.author} 
							pages={book.pages}
							freeBookmark={this.state.freeBookmark}/>
				)}
			</div>
		)
	}
}


// Library is the main component
// Pass the booklist to the component using the parameter books
render(
	<Library books={bookList}/>, 
	document.getElementById('root')
)