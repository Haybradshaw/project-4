import React, { Component } from 'react'

export default class Form extends Component {

	state = {
		author: '',
		post: ''
	}
	handleChange = event => {
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
		})
    }
    
    handleSubmit = event => {
        console.log(' form index.js line 18 this event fired')
        event.preventDefault()
        this.props.handleAddPost(this.state)
    } 

	render() {
		/** * TODO : form goes here and we need the following inputs
		 * title author and post
		 */
		return (
			<form onSubmit={this.handleSubmit}>
				<div />
                    <label>Author</label>
                    <input
                        onChange={this.handleChange}
                        name="author"
                        value={this.state.author}
                    />
				<div />
                <div>
                    <label>Slogan</label>
                    <input
                        onChange={this.handleChange}
                        name="post"
                        value={this.state.post}
                    />
                </div>
				<input type="submit"  />
			</form>
		)
	}
}