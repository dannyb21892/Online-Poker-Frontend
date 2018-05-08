import React from "react"
import GameResultss from './GameResultss.js'
import Player from './Player.js'

class Gameplay extends React.Component {
  state = {
    started: false,
    judged: false,
    interval: null,
    playerCards: [],
    judgeGame: false,
    playerInfo: this.props.playerInfo,
    whoseturn: 0
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
    .then(json=>this.setState({
      started: json.response
    }))
  }

  // stateChange = (key, val) => {
  //   this.setState({
  //     [key]: val
  //   })
  // }

  componentDidMount() {
    this.state.interval = setInterval(()=>{
      fetch(`http://localhost:3000/api/v1/matches/${this.props.game.gameId}`)
      .then(resp=>resp.json())
      .then(json=>{
        console.log(json)                                                    //////////readd if need to see the continous console.logs for some data
        let cards = json.data.filter(d => d.player === this.props.player)
        this.setState({
          playerCards: cards,
          started: json.active,
          judged: json.judged,
          judgeGame: json.judgement,
          whoseturn: json.whoseturn_id,
          maxbet: json.maxbet
        })
      })
    }, 500)
  }

  judgeGame = () => {
    fetch(`http://localhost:3000/api/v1/matches/${this.props.game.gameId}`,{
      method: "PATCH",
      headers: {
       'Content-type':'application/json'
      },
      body: JSON.stringify({
        app_action: "judge_game"
      })
    })
    .then(resp=>resp.json())
    .then(json=>{
      this.setState({
        judgeGame: json.judgement,
        judged: json.judged,
        started: json.active,
      })
    })
  }

  clearStateInterval = () => {
    clearInterval(this.state.interval)
  }

  componentWillUnmount(){
    this.clearStateInterval()
  }

  render () {
    let results = (this.state.judged && this.state.judgeGame) ? <GameResultss judgeGame={this.state.judgeGame} username={this.props.player} clear={this.clearStateInterval}/> : null
    let cards = []
    let leftstyle = 20
    this.state.playerCards.forEach(card => {
        cards.push(<div className="playerCard">
          <img src={card.card.img_link} alt={card.card.code} style={{position: "absolute", left: leftstyle + "%"}}/>
        </div>)
        leftstyle = leftstyle + 12
      }
    )
    let message = this.props.player === this.props.game.owner ? "your own" : (this.props.game.owner + "s")
    // let judgeGameButton = (this.state.playerCards.length === 5 && !this.state.judged) ? <button onClick={this.judgeGame} >Judge Game</button> : null
    let backToLobby = results ? <button onClick={this.props.backToLobby}>Back to Lobby</button> : null
    return (
      <div className="Gameplay">
        <p>You have joined {message} game </p>
        <button onClick={this.startGame}>Start Game!</button> <br/>
        <div className="CardContainer" style={{width: 100 + "%", height: 500 + "px"}}>
          {cards}
        </div>
        { results }
        <div>
          <Player player={this.props.player} playerInfo={this.state.playerInfo} started={this.state.started} game={this.props.game} whoseturn={this.state.whoseturn} maxbet={this.state.maxbet}/>
        </div>
        <div className="judgeGameButton">
        { backToLobby }
        </div>
      </div> //query backend for game updates with this.props.game.gameId
    )
  }
}

export default Gameplay
