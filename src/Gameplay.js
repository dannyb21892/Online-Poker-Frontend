import React from "react"

class Gameplay extends React.Component {
  render () {
    return (
      <div className="Gameplay">
        <p>{this.props.player} has joined {this.props.game.owner}s game </p>
      </div> //query backend for game updates with this.props.game.gameId
    )
  }
}

export default Gameplay
