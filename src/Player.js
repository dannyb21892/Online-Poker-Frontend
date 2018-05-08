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
      console.log(json)
      if(json.success) {
        this.setState({
          money: json.money,
          bet: true
        })
      }
    })
  }

  render () {
    let yourturn = this.props.whoseturn == this.props.playerInfo.id
    let message = !yourturn ? <span>It is not yet your turn to bet</span> : null
    let disabled = (this.state.bet || !this.props.started) || !yourturn
    return (
      <div>
        <p>Username: {this.state.username}</p>
        <p>Bank: ${this.state.money}</p>
        {message}
        <form onSubmit={this.bet}>
          Bet: <input type="number"
                  min={this.state.bet}
                  max={this.state.money} s
                  tep="1"
                  disabled={disabled}
                  value={this.state.selectedBet}
                  onChange={(e)=>this.setState({selectedBet: e.target.value})}></input><br />
          <input type="submit" disabled={disabled}></input>
        </form>
      </div>
    )
  }
}

export default Player
