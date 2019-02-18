import React from 'react'
import PropTypes from 'prop-types'
import { Book } from './Book'
import { Hiring } from './Hiring'
import { NotHiring } from './NotHiring'

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

export default Library