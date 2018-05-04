import React from "react"

const Game = (props) => {
  return (
    <div className="Game">
      <p>{props.owner} created this game</p>
      <span>{props.openSlots} slots open in this game</span><br/>
      <button onClick={() => props.joinGame(props.id, props.owner)}>Join this game</button>
    </div>
  )
}

export default Game
