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

  handleLogout = () => {
    userService.logOut();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Router>
          <Switch>
              <Route exact path='/' render={() =>
                <SighupPage
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                />
              } />
              <Route exact path='/login' render={({ history }) =>
                <LoginPage
                  history={history}
                  handleSignupOrLogin={this.handleSignupOrLogin}
                />
              } />
            </Switch>
          </Router>
        </header>
      </div>
        );
      }
    }
    
    
    export default App;