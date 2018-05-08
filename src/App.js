import React, { Component } from 'react';
import Login from "./Login"
// import Lobby from "./Lobby"
import Gameplay from "./Gameplay"
import './App.css';

class App extends Component {
  state = {
    username: "",
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
    fetch("http://localhost:3000/api/v1/players",{
      method: "POST",
      headers: {
       'Content-type':'application/json'
      },
      body: JSON.stringify({username: this.state.username})
    })
    .then(response=>response.json())
    .then(json=>this.setState({      loggedIn: json["logged_in"]    })
      ,()=>{{console.log("insidecallback");this.newGame}}
    )
    // .then(json=>console.log(json))
  }

  joinGame = (game_id, owner) => {                                              //start a game
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
    },()=>{console.log("inside changeState");console.log(this.state);})
  }
////////////////////////////////////////////////////////////////////////////////
newGame = () => {
  fetch("http://localhost:3000/api/v1/matches",{
    method: "POST",
    headers: {
     'Content-type':'application/json'
    },
    body: JSON.stringify({owner: this.state.username})
  })
  .then(response=>response.json())
  // .then(json=>console.log(json))
  // .then(json=>this.setState({
  //     openGames: [...this.state.openGames, json["newOpenGame"]]
  //   }, () => this.props.joinGame(json["newOpenGame"]["match"]["id"], json["newOpenGame"]["owner"]))
  // )
  .then(json=>this.joinGame(json["newOpenGame"]["match"]["id"], json["newOpenGame"]["owner"] ))
  //some code that tells App to stop rendering Lobby and render created game
}

////////////////////////////////////////////////////////////////////////////////


  render() {
    let show
    if (this.state.loggedIn) {
      // show = <div>logged in</div>
      //START GAME SOMEHOW
////////////////
// THE BYPASS BLOCK
  // {this.newGame()}
  // show = <Gameplay game={this.state.whichGame} player={this.state.username}/>
////////////////
//uncomment below if bypass doesnt work
      if (this.state.inGame) {
        show = <Gameplay game={this.state.whichGame} player={this.state.username}/>
      } else {
        // show = <Lobby username={this.state.username} joinGame={this.joinGame}/>
        // show = <Lobby username={this.state.username} joinGame={this.joinGame}/>  //remove joinGame
///////////
        // show = <button onClick={this.newGame}>Open new game</button>
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
