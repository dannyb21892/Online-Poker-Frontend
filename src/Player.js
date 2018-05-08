import React from "react"

class Player extends React.Component {

  state = {
    username: this.props.player,
    money: this.props.playerInfo.money,
    selectedBet: 1,
    turnType: "bet",
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

  fixSelect = () => {
    if (this.props.maxbet > 0 && this.state.turnType === "bet") {
      this.setState({
        turnType: "call"
      })
    } else if (this.props.maxbet === 0 && this.state.turnType === "call") {
      this.setState({
        turnType: "bet"
      })
    }
  }

  render () {
    let yourturn = this.props.whoseturn == this.props.playerInfo.id
    let message = (!yourturn && this.props.started) ? <span>It is not yet your turn to bet</span> : null
    let disabled = (this.state.bet || !this.props.started) || !yourturn
    let maxInput = this.props.maxbet > 0 ? this.props.maxbet : this.props.money
    if (maxInput > this.props.money) {maxInput = this.props.money}
    this.fixSelect()
    return (
      <div>
        <p>Username: {this.state.username}</p>
        <p>Bank: ${this.state.money}</p>
        {message}
        <form onSubmit={this.bet}>
          Bet: <input type="number"
                  min={this.props.maxbet}
                  max={maxInput}
                  step="1"
                  disabled={disabled}
                  value={this.state.selectedBet}
                  onChange={(e)=>this.setState({selectedBet: e.target.value})}></input><br />
          <select value={this.state.turnType} onChange={(e)=>{
              let newBet = this.state.selectedBet
              if (e.target.value === "call") {
                newBet = this.props.maxbet
              }
              this.setState({
                turnType: e.target.value,
                selectedBet: newBet
              })
            }
          }>
            <option value="bet" disabled={this.props.maxbet > 0}>Bet</option>
            <option value="call" disabled={this.props.maxbet === 0}>Call</option>
            <option value="fold">Fold</option>
          </select>
          <input type="submit" disabled={disabled}></input>
        </form>
      </div>
    )
  }
}

export default Player
