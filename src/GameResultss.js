import React from "react"
import MrrobotoCards from './MrrobotoCards'
class GameResultss extends React.Component {

  // didWin = ()=>{
  //   let win= this.props.judgeGame.winner[this.props.username]
  //   // console.log("winner? " + win);
  // }

  componentWillMount(){
    this.props.clear()
  }

  results=()=>{
    // let results = this.props.judgeGame.winner.map((k,v)=>
    //   <li>{k} has a {v}</li>
    // )
    let players = Object.keys(this.props.judgeGame.winner)
    // return players
    // console.log(players);
    let winner = null
    if(this.props.judgeGame.winner[players[0]]){winner = players[0]}
    else{winner = players[1]}
    let didIWin = null
    if(this.props.username === winner){didIWin="YOU WON!!!!!!!!"}
    else {didIWin = "YOU LOST!!!!!!!!"}

    return (
      <div>
        <MrrobotoCards judgeGame={this.props.judgeGame}/>
        <h1>{didIWin}</h1>
        <p>{players[0]} has a hand of {this.props.judgeGame.ranks[players[0]]} </p>
        <p>{players[1]} has a hand of {this.props.judgeGame.ranks[players[1]]}</p>

      </div>
    )
  }
  //
  // <li>Players are {players}</li>
  // <li>WINNER IS {winner}!!!!!!</li>


  render(){
    // console.log("judgeGame");
    // console.log(this.props.judgeGame);
    // console.log("My username is :" +this.props.username );
    return(
      <div className="GameResultss">

        <h3>Results:</h3>
        {this.results()}
        <button onClick={this.props.playAgain}>Play Again?</button>
      </div>
    )//return
  }//render

} //class

export default GameResultss
// {this.didWin ? <h1>YOU WON!</h1> : <h1>YOU LOST!</h1>}
