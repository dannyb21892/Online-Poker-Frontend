import React from "react"
import GameResultss from './GameResultss.js'
import StartGame from './StartGame'
let url = "http://vsparrow-single-poker-api.herokuapp.com"

class Gameplay extends React.Component {
  state = {
    started: false,
    judged: false,
    interval: null,
    playerCards: [],
    judgeGame: false
  }



  startGame = () => {
    fetch(`${url}/api/v1/matches/${this.props.game.gameId}`,{
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


  componentDidMount() {
    this.setState({interval:  setInterval(()=>{
      fetch(`${url}/api/v1/matches/${this.props.game.gameId}`)
      .then(resp=>resp.json())
      .then(json=>{
        let cards = json.data.filter(d => d.player === this.props.player)
        this.setState({
          playerCards: cards,
          started: json.active,
          judged: json.judged,
          judgeGame: json.judgement
        })
      })
    }, 500)})
  }

  judgeGame = () => {
    fetch(`${url}/api/v1/matches/${this.props.game.gameId}`,{
      method: "PATCH",
      headers: {
       'Content-type':'application/json'
      },
      body: JSON.stringify({
        app_action: "judge_game"
      })
    })
    .then(resp=>resp.json())
    .then(json=>this.setState({
      judgeGame: json.judgement,
      judged: json.judged,
      started: json.active
    }))
  }

  clearStateInterval = () => {
    clearInterval(this.state.interval)
  }

  judgeGameButton = ()=>{
    let button = null
    if(this.state.playerCards.length === 5){button = <button className="btn btn-primary btn-lg" onClick={this.judgeGame}>Judge Game</button> }
    if(this.state.judgeGame){button = null}
    return button
  }

  render () {
    console.log(this.state.judged, this.state.judgeGame)
    let results = (this.state.judged && this.state.judgeGame) ? <GameResultss judgeGame={this.state.judgeGame} username={this.props.player} clear={this.clearStateInterval} playAgain={this.props.playAgain}/> : null
    let cards = []
    let leftstyle = 20
    this.state.playerCards.forEach((card,index) => {
        cards.push(<div className="playerCard" key={index}>
          <img src={card.card.img_link} alt={card.card.code} style={{position: "absolute", left: leftstyle + "%", width: 200, height: 200}}/>
        </div>)
        leftstyle = leftstyle + 12
      }
    )

    return (
      <div className="Gameplay">
        <StartGame startGame={this.startGame} judgeGame={this.state.judgeGame} started={this.state.started}/>
        <div className="CardContainer" style={{width: 100 + "%", height: 200 + "px"}}>
          {cards}
        </div>
        <div className="judgeGameButton">
          { results }
          {this.judgeGameButton()}
        </div>
      </div>
    )
  }
}

export default Gameplay
