import React from "react"
class GameResultss extends React.Component {

  didWin = ()=>{
    let win= this.props.judgeGame.winner[this.props.username]
    console.log("winner? " + win);
  }

  results=()=>{
    // let results = this.props.judgeGame.winner.map((k,v)=>
    //   <li>{k} has a {v}</li>
    // )
    let players = Object.keys(this.props.judgeGame.winner)
    // return players
    console.log(players);
    let winner = null
    if(this.props.judgeGame[players[0]]){winner = players[0]}
    else{winner = players[1]}
    return (
      <div>
      <li>Players are {players}</li>
      <li>WINNER IS {winner}!!!!!!</li>
      <li>{players[0]} has a hand of {this.props.judgeGame.ranks[players[0]]} </li>
      <li>{players[1]} has a hand of {this.props.judgeGame.ranks[players[1]]}</li>
      </div>
    )
  }

  render(){
    // console.log("judgeGame");
    console.log(this.props.judgeGame);
    // console.log("My username is :" +this.props.username );
    return(
      <div className="GameResultss">

        GameResults are here
        <h3>Results:</h3>
        {this.results()}

      </div>
    )//return
  }//render

} //class

export default GameResultss
// {this.didWin ? <h1>YOU WON!</h1> : <h1>YOU LOST!</h1>}
