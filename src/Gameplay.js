import React from "react"

class Gameplay extends React.Component {
  state = {
    started: false,
    interval: null,
    playerCards: []
  }

  startGame = () => {
    fetch(`http://localhost:3000/api/v1/matches/${this.props.game.gameId}`,{
      method: "PATCH",
      headers: {
       'Content-type':'application/json'
      },
      body: JSON.stringify({
        app_action: "start_game"
      })
    })
    .then(resp=>resp.json())
    .then(json=>this.stateChange("started", json.response))
  }

  stateChange = (key, val) => {
    this.setState({
      [key]: val
    })
  }

  componentDidMount() {
    this.state.interval = setInterval(()=>{
      fetch(`http://localhost:3000/api/v1/matches/${this.props.game.gameId}`)
      .then(resp=>resp.json())
      .then(json=>{
        let cards = json.data.filter(d => d.player === this.props.player)
        this.stateChange("playerCards", cards)
      })
    }, 3000)
  }

  render () {
    let cards = this.state.playerCards.map(card =>
      <div className="playerCard">
        <img src={card.card.img_link} alt={card.card.code} />
      </div>
    )

    return (
      <div className="Gameplay">
        <p>{this.props.player} has joined {this.props.game.owner}s game </p>
        <button onClick={this.startGame}>Start Game!</button>
        {cards}
      </div> //query backend for game updates with this.props.game.gameId
    )
  }
}

export default Gameplay
