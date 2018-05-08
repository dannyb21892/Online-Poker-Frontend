import React, { Component } from 'react';
import Login from "./Login"
import Lobby from "./Lobby"
import Gameplay from "./Gameplay"
import './App.css';

class App extends Component {
  state = {
    username: "",
    loggedIn: false,
    playerInfo: null,
    inGame: false,
    whichGame: {gameId: null, owner: null}
  }

  usernameChange = (e) => {
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
      loggedIn: json["logged_in"],
      playerInfo: json["player_info"]
    }))
  }

  joinGame = (game_id, owner) => {
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
    .then(json=>this.setState({
      inGame: json.response,
      whichGame: {gameId: game_id, owner: owner},
      playerInfo: {
        ...this.state.playerInfo,
        money: json.money
      }
    }))
  }

  changeState = (json, game_id, owner) => {
    this.setState({
      inGame: json.response,
      whichGame: {gameId: game_id, owner: owner}
    })
  }

  backToLobby = () => {
    this.setState({
      inGame: false,
      whichGame: {gameId: null, owner: null}
    })
  }


  render() {
    let show
    if (this.state.loggedIn) {
      if (this.state.inGame) {
        show = <Gameplay backToLobby={this.backToLobby} game={this.state.whichGame} player={this.state.username} playerInfo={this.state.playerInfo}/>
      } else {
        show = <Lobby username={this.state.username} joinGame={this.joinGame}/>
      }
    } else {
      show = <Login username={this.state.username} usernameChange={this.usernameChange} loginSubmit={this.loginSubmit} />
    }
    let id = this.state.inGame ? "inGameApp" : "App"

    return (
      <div className="App" id={id}>
        {show}
      </div>
    );
  }
}

export default App;
