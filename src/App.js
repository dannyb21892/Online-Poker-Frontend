import React, { Component } from 'react';
import Login from "./Login"
import Lobby from "./Lobby"
import Gameplay from "./Gameplay"
import './App.css';

class App extends Component {
  state = {
    username: "",
    loggedIn: false,
    inGame: false,
    whichGame: {gameId: null, owner: null}
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

  joinGame = (game_id, owner) => {
    console.log(game_id, owner)
    fetch(`http://localhost:3000/api/v1/matches/${game_id}`,{
      method: "PATCH",
      headers: {
       'Content-type':'application/json'
      },
      body: JSON.stringify({
        app_action: "join_game",
        data: {
          username: this.state.username
        }
      })
    })
    .then(resp=>resp.json())
    .then(json=>this.changeState(json, game_id, owner))
  }

  changeState = (json, game_id, owner) => {
    this.setState({
      inGame: json.response,
      whichGame: {gameId: game_id, owner: owner}
    })
  }

  render() {
    let show
    if (this.state.loggedIn) {
      if (this.state.inGame) {
        show = <Gameplay game={this.state.whichGame} player={this.state.username}/>
      } else {
        show = <Lobby username={this.state.username} joinGame={this.joinGame}/>
      }
    } else {
      show = <Login username={this.state.username} usernameChange={this.usernameChange} loginSubmit={this.loginSubmit} />
    }

    return (
      <div className="App">
        {show}
      </div>
    );
  }
}

export default App;
