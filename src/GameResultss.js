import React from "react"
class GameResultss extends React.Component {

  didWin = ()=>{
    let win= this.props.judgeGame.winner[this.props.username]
    console.log("winner? " + win);
  }

  render(){
    // console.log("judgeGame");
    console.log(this.props.judgeGame);
    // console.log("My username is :" +this.props.username );
    return(
      <div className="GameResultss">

        GameResults are here

      </div>
    )//return
  }//render

} //class

export default GameResultss
// {this.didWin ? <h1>YOU WON!</h1> : <h1>YOU LOST!</h1>}
