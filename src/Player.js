import React from "react"

class Player extends React.Component {

  state = {
    username: this.props.player,
    money: this.props.playerInfo.money,
    selectedBet: 1,
    bet: false
  }

  bet = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/api/v1/players/${this.props.playerInfo.id}`, {
      method: "PATCH",
      headers: {
       'Content-type':'application/json'
      },
      body: JSON.stringify({
        bet: this.state.selectedBet,
        match_id: this.props.game.gameId
      })
    })
    .then(response=>response.json())
    .then(json=>{
      if(json.success) {
        this.setState({
          money: json.money,
          bet: true
        })
      }
    })
  }

  render () {
    return (
      <div>
        <p>Username: {this.state.username}</p>
        <p>Bank: ${this.state.money}</p>
        <form onSubmit={this.bet}>
          Bet: <input type="number"
                  min={this.state.bet}
                  max={this.state.money} s
                  tep="1"
                  disabled={this.state.bet || !this.props.started}
                  value={this.state.selectedBet}
                  onChange={(e)=>this.setState({selectedBet: e.target.value})}></input><br />
          <input type="submit" disabled={this.state.bet || !this.props.started}></input>
        </form>
      </div>
    )
  }
}

export default Player
