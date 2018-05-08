import React from "react"
import Game from "./Game"

class Lobby extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      interval: null,
      openGames: []
    }
  }

  newGame = () => {
    fetch("http://localhost:3000/api/v1/matches",{
      method: "POST",
      headers: {
       'Content-type':'application/json'
      },
      body: JSON.stringify({owner: this.props.username})
    })
    .then(response=>response.json())
    .then(json=>this.setState({
        openGames: [...this.state.openGames, json["newOpenGame"]]
      }, () => this.props.joinGame(json["newOpenGame"]["match"]["id"], json["newOpenGame"]["owner"]))
    )
    //some code that tells App to stop rendering Lobby and render created game
  }

  componentDidMount(){
    this.state.interval = setInterval(() =>
      fetch("http://localhost:3000/api/v1/matches")
      .then(response=>response.json())
      .then(json=>this.setState({
        openGames: json["data"]
    }))
    , 500)
  }

  componentWillUnmount(){
    clearInterval(this.state.interval)
  }

  render() {
    // console.log(this.state.openGames)
    let games = this.state.openGames.map(game=>{
      return (
        <Game owner={game.owner} joinGame={this.props.joinGame} id={game.match.id} openSlots={game.openSlots}/>
      )
    })

    return (
      <div className="lobby" style={{position: "absolute", top: "5%", width: "100%", height: "100%"}}>
        <h1 style={{color: "white"}}>Welcome to the Game Lobby</h1>
        <h3 style={{color: "white"}}>Choose an open game to join, or open your own</h3>
        <button onClick={this.newGame}>Open new game</button><br/><br/>
        <div class="ui cards">
          <div class="ui grid container">
            {games}
          </div>
        </div>
      </div>
    )
  }
}

export default Lobby

// <ul className="openGames">
// {games}
// </ul>
