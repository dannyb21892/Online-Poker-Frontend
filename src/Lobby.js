import React from "react"
import Game from "./Game"

class Lobby extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      openGames: ["hey"]
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
    .then(json=>console.log(json))//some code that tells App to stop rendering Lobby and render created game
  }

  componentDidMount(){
    fetch("http://localhost:3000/api/v1/matches")
    .then(response=>response.json())
    .then(json=>this.setState({
      openGames: json
    }))
  }

  render() {
    console.log(this.state.openGames)
    let games = this.state.openGames.map(game=>{
      return (
        <li><Game username={this.props.username}/></li>
      )
    })

    return (
      <div className="lobby">
        <ul className="openGames">
          {games}
        </ul>
        <button onClick={this.newGame}>Open new game</button>
      </div>
    )
  }
}

export default Lobby
