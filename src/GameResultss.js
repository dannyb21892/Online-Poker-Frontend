import React from "react"
class GameResultss extends React.Component {

  render(){
    console.log("judgeGame");
    console.log(this.props.judgeGame);
    console.log("My username is :" +this.props.username );
    return(
      <div className="GameResultss">
        GameResults are here
        <h1>WHY DO YOU NOT RENDER?</h1>
      </div>
    )//return
  }//render

} //class

export default GameResultss
