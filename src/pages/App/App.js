import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import userService from '../../utils/userService'
import './App.css';
import LoginPage from '../LoginPage/LoginPage'
import SignupPage from '../SignupPage/SignupPage'



class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
    }
  }

  componentDidMount() {
		getPosts().then(results =>
			this.setState({
				posts: results
			})
		)
	}

  handleClick = event => {
		this.setState({
			isPosting: !this.state.isPosting
		})
	}

  handleLogout = () => {
    userService.logOut();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  }

  handleAddPost = ({ title, author, post }) => {
		//this line was the culprit of errors we had a '-' instead of a '/' in application/json on line 34
		const options = {
			method: 'POST',
			headers: {
 				'content-type': 'application/json'
			},
			body: JSON.stringify({ title, author, post })
		}
		console.log(options)
		async function createPost() {
			try {
				const sendPost = await fetch('http://localhost:8000/api/post', options)
				const postResult = await sendPost.json()
				return await postResult
			} catch (error) {
				console.log('line 39', error)
			}
		}

		createPost().then(result => {
			console.log(result)
			this.setState({
				posts: [{ ...result }, ...this.state.posts],
				isPosting : false
			})
		})
	}

	handleDeletePost = postIdx => {
		// We cannot mutate state directly
		const newStateArray = this.state.posts.filter(
			(elem, idx) => idx !== postIdx
		)

		this.setState({ posts: newStateArray })
	}


  // render() {
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //         <Router>
  //         <Switch>
  //             <Route exact path='/' render={() =>
  //               <SighupPage
  //                 user={this.state.user}
  //                 handleLogout={this.handleLogout}
  //               />
  //             } />
  //             <Route exact path='/login' render={({ history }) =>
  //               <LoginPage
  //                 history={history}
  //                 handleSignupOrLogin={this.handleSignupOrLogin}
  //               />
  //             } />
  //           </Switch>
  //         </Router>
  //       </header>
  //     </div>
  //       );
  //     }
  //   }
    
  render() {
		/**
	    	* *TODO: extract this as a component to another file
		 */

		const postsList = this.state.posts.map((post, index) => {
			return (
				<BlogPost
					key={index}
					{...post}
					handleDeletePost={this.handleDeletePost}
					index={'party'}
				/>
			)
		})

		return (
			<div>
				<header>
					<h1>Party Blog</h1>
				</header>
				<section>
					<Button handleClick={this.handleClick} type={'Add New Post'} />
					{!!this.state.isPosting ? (
						<Form handleAddPost={this.handleAddPost} />
					) : null}
					<ul>{postsList}</ul>
				</section>
			</div>
		)
	}
}

// TODO extract lines 98/116 to a utils/services file
// this is the magic fetching function that gets our data from the API
async function getPosts() {
	try {
		const fetchPosts = await fetch('http://localhost:8000/api/posts')
		const data = fetchPosts.json()
		return await data
	} catch (error) {
		console.log(error)
	}
}

    export default App;