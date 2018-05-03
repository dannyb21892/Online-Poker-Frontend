import React, { Component } from 'react';
import Login from "login"
import './App.css';

class App extends Component {
  state = {
    username: ""
  }
  usernameChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  loginSubmit = (e) => {
    console.log("submitting ", this.state.username)
  }

  render() {
    return (
      <div className="App">
        <Login username={this.state.username} usernameChange={this.username} loginSubmit={this.loginSubmit} />
      </div>
    );
  }
}

export default App;
