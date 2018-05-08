import React from "react"
class StartGame extends React.Component {

  render(){
    return(
      <div>
        <button  onClick={this.props.startGame}>Start Game!</button><br/>
      </div>
    )
  }
}//class

export default StartGame
