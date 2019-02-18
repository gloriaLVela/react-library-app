import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'

// Array of data called book list
let bookList = [
	{"title": "El otoño del patriarca", "author": "Gabriel García Márquez", "pages": 250},
	{"title": "Hunger", "author": "Roxane Gay", "pages": 320},
	{"title": "The Sun Also Rises", "author": "Ernest Hemingway", "pages": 260},
	{"title": "White Teeth", "author": "Zadie Smith", "pages": 480},
	{"title": "Cat's Cradle", "author": "Kurt Vonnegut", "pages": 304}
]

// Set the defau;ts
const Book = ({title="No Title Provided", author= "No Author", pages=0, freeBookmark}) => {
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
	
	static defaultProps = {
		books: [
			{"title": "Tahoe Tales", "author": "Chet Whitley", "pages": 1000}
		]
	}

	state = { 
		open: true,
		freeBookmark: false,
		hiring: true,
		data: [],
		loading: false
	}

	// Component lifecycle methods are only available when using class syntax, so you can't use them with function components.
	// More information http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
	componentDidMount() {
		// Component did mount is a really excellent place to fetch data
		this.setState({loading: true})
		// Fetch data from a Rest API
		fetch('https://hplussport.com/api/products/order/price/sort/asc/qty/1')
			.then(data => data.json())
			.then(data => this.setState({data, loading: false}))
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
				{this.state.loading 
					? "loading..."
					: <div  >
						{this.state.data.map(product => {
							return (
								<div key={product.id}>
									<h3>Library Product of the Week!</h3>
									<h4>{product.name}</h4>
									<img src={product.image} height={100} alt={product.name} />
								</div>
							)
						})}
						
					</div>
				}
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


//  PropTypes is a form of type checking, so that we do not pass the wrong data type to a component, 
// which could cause a crash or some unexpected behavior in your application.
Library.propTypes = {
	books: PropTypes.array
}

Book.propTypes = {
	title: PropTypes.string,
	author: PropTypes.string,
	pages: PropTypes.number,
	freeBookmark: PropTypes.bool
}

// Library is the main component
// Pass the booklist to the component using the parameter books
render(
	<Library books={bookList} />, 
	document.getElementById('root')
)