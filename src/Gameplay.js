import React from "react"
import GameResultss from './GameResultss.js'
import StartGame from './StartGame'

class Gameplay extends React.Component {
  state = {
    started: false,
    judged: false,
    interval: null,
    playerCards: [],
    judgeGame: false
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
    this.setState({interval:  setInterval(()=>{
      fetch(`http://localhost:3000/api/v1/matches/${this.props.game.gameId}`)
      .then(resp=>resp.json())
      .then(json=>{
        // console.log(json)                                                    //////////readd if need to see the continous console.logs for some data
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
    // .then(json=>console.log(json))
    .then(json=>this.setState({
      judgeGame: json.judgement,
      judged: json.judged,
      started: json.active
    }))
  }

  clearStateInterval = () => {
    clearInterval(this.state.interval)
  }

  // let judgeGameButton = this.state.playerCards.length === 5 ? <button onClick={this.judgeGame} >Judge Game</button> : null
  judgeGameButton = ()=>{
    let button = null
    if(this.state.playerCards.length === 5){button = <button onClick={this.judgeGame}>Judge Game</button> }
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
    // let message = this.props.player === this.props.game.owner ? "your own" : (this.props.game.owner + "s")
    // let judgeGameButton = this.state.playerCards.length === 5 ? <button onClick={this.judgeGame} >Judge Game</button> : null
    return (
      <div className="Gameplay">
        <StartGame startGame={this.startGame} judgeGame={this.state.judgeGame} started={this.state.started}/>

        <div className="CardContainer" style={{width: 100 + "%", height: 200 + "px"}}>
          {cards}
        </div>
        <div>

        </div>
        <div className="judgeGameButton">
        { results }
        {this.judgeGameButton()}
        </div>
      </div> //query backend for game updates with this.props.game.gameId
    )
  }
}

export default Gameplay
