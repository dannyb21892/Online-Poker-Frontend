import React, { Component } from 'react';
import Login from "./Login"
import Gameplay from "./Gameplay"
import './App.css';
let url = "http://vsparrow-single-poker-api.herokuapp.com"

class App extends Component {
  state = {
    username: "",
    user_id: null,
    user_money: null,
    loggedIn: false,
    inGame: false,
    whichGame: {gameId: null, owner: null}
  }


  setUsername = (e) => {                                                        //set username
    this.setState({
      username: e.target.value
    },()=>{console.log("username is:" + this.state.username)})
  }

  loginSubmit = (e) => {                                                        //login user
    e.preventDefault()
    fetch(url + "/api/v1/players",{
      method: "POST",
      headers: {
       'Content-type':'application/json'
      },
      body: JSON.stringify({username: this.state.username})
    })
    .then(response=>response.json())
    .then(json=>this.setState({      loggedIn: json["logged_in"], user_id: json["player_id"]    })
    )
  }

  joinGame = (game_id, owner) => {                                              //start a game
    console.log(game_id, owner)
    fetch(`${url}/api/v1/matches/${game_id}`,{
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
      whichGame: {gameId: game_id, owner: owner},
      user_money: json.money
    },()=>{console.log("inside changeState");console.log(this.state);})
  }

  newGame = () => {
    fetch(url + "/api/v1/matches",{
      method: "POST",
      headers: {
       'Content-type':'application/json'
      },
      body: JSON.stringify({owner: this.state.username})
    })
    .then(response=>response.json())
    .then(json=>this.joinGame(json["newOpenGame"]["match"]["id"], json["newOpenGame"]["owner"] ))
  }

  playAgain = ()=>{
    console.log("Play again");
    this.setState({
      loggedIn: true,
      inGame: false,
      whichGame: {gameId: null, owner: null}
    })
  }

  render() {
    let show
    if (this.state.loggedIn) {
      if (this.state.inGame) {
        show = <Gameplay game={this.state.whichGame} player={this.state.username} playAgain={this.playAgain}/>
      } else {
        {this.newGame()}
        show = <h1>LOADING</h1>
      }
    } else {
      show = <Login username={this.state.username} setUsername={this.setUsername} loginSubmit={this.loginSubmit} />
    }
    return (
      <div className="App">
        {show}
      </div>
    );
  }
}

export default App;
