import React from "react"
class GameResultss extends React.Component {

  componentWillMount(){
    this.props.clear()
  }

  results=()=>{
    let players = Object.keys(this.props.judgeGame.winner)
    let winner = null
    if(this.props.judgeGame.winner[players[0]]){winner = players[0]}
    else{winner = players[1]}
    let didIWin = null
    if(this.props.username === winner){didIWin="YOU WON!!!!!!!!"}
    else {didIWin = "YOU LOST!!!!!!!!"}

    return (
      <div>
        <h1 style={{color: "white"}}>{didIWin}</h1>
        <p style={{color: "white"}}>{players[0]} has a hand of {this.props.judgeGame.ranks[players[0]]}</p>
        <p style={{color: "white"}}>{players[1]} has a hand of {this.props.judgeGame.ranks[players[1]]}</p>
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
        <h3 style={{color: "white"}}>Results:</h3>
        {this.results()}
      </div>
    )//return
  }//render

} //class

export default GameResultss
// {this.didWin ? <h1>YOU WON!</h1> : <h1>YOU LOST!</h1>}
