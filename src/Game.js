import React from "react"

const Game = (props) => {
  return (
    <div className="ui four wide column">
      <div class="card" style={{backgroundColor: "#B4CFD3", borderRadius: "10px", borderColor: "#137108", borderStyle: "solid", borderWidth: "3px", width: "200px", height: "100px"}}>
        <div class="content">
          <div class="header"><strong><u>Game Type: 5-Card Stud</u></strong></div>
          <div class="description" style={{color: "#3E3E3E"}}>
            Open Slots: {props.openSlots} <br/>
            Owner: {props.owner}
          </div>
        </div>
        <div class="ui bottom attached button"  onClick={() => props.joinGame(props.id, props.owner)}>
          <i class="add icon"></i>
          Join this game
        </div>
      </div>
    </div>
  )
}

export default Game


// <div className="Game">
// <p>{props.owner} created this game</p>
// <span>{props.openSlots} slots open in this game</span><br/>
// <button onClick={() => props.joinGame(props.id, props.owner)}>Join this game</button>
// </div>
