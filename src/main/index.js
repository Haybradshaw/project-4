import React, { Component } from 'react'
import Form from '../Form'

export default class Main extends Component {
	state = {
		isPosting: true,
		posts: [
			{
				author: 'author',
				post:
					'Ipsum reprehenderit id aliqua in deserunt. Esse sunt veniam culpa excepteur ex aliqua adipisicing irure occaecat enim ad consequat ullamco. Officia qui duis esse nisi cillum duis dolore et irure qui commodo quis. Incididunt eiusmod do fugiat voluptate voluptate eu proident consectetur aliquip reprehenderit sunt aliquip. Lorem occaecat velit velit quis ullamco culpa sunt anim enim reprehenderit enim exercitation sit qui. Ut sit voluptate eiusmod pariatur.'
			}
		]
	}
	handleClick = event => {
		this.setState({
			isPosting: !this.state.isPosting
		})
	}

	handleAddPost = ({ author, post }) => {
		this.setState({
			posts: [{ author, post }, ...this.state.posts]
		})
	}

	handleDeletePost = postIdx => {
		// We cannot mutate state directly
		const newStateArray = this.state.posts
		.filter((elem, idx) => idx !== postIdx);

		this.setState({ posts: newStateArray });
	}

	render() {
		const postsList = this.state.posts.map((post, index) => {
			return (
				<li key={index}>
					<h5>{post.author}</h5>
					<h6>{post.post}</h6>
					<button onClick={() => this.handleDeletePost(index)}>Delete</button>
				</li>
			)
		})

		return (
			<div>
				<header>
					<h1>Slogans everywhere</h1>
				</header>
				<section>
					<button onClick={this.handleClick}>toggle</button>
					{!!this.state.isPosting ? (
						<Form handleAddPost={this.handleAddPost} />
					) : null}
					<ul>{postsList}</ul>
				</section>
			</div>
		)
	}
}