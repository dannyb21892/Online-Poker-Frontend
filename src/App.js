import React, { Component } from 'react';
import Login from "./Login"
import Lobby from "./Lobby"
import './App.css';

class App extends Component {
  state = {
    username: "",
    loggedIn: false,
    inGame: false
  }

  usernameChange = (e) => {
    console.log(e.target.value)
    this.setState({
      username: e.target.value
    })
  }

  loginSubmit = (e) => {
    e.preventDefault()
    fetch("http://localhost:3000/api/v1/players",{
      method: "POST",
      headers: {
       'Content-type':'application/json'
      },
      body: JSON.stringify({username: this.state.username})
    })
    .then(response=>response.json())
    .then(json=>this.setState({
      loggedIn: json["logged_in"]
    }))
  }

  render() {
    let show = this.state.loggedIn ?
    <Lobby username={this.state.username} /> :
    <Login username={this.state.username} usernameChange={this.usernameChange} loginSubmit={this.loginSubmit} />

    return (
      <div className="App">
        {show}
      </div>
    );
  }
}

export default App;
