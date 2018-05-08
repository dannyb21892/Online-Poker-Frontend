import React from "react"

const Login = (props) => {
  return (
    <div className="login jumbotron">
    <h1 class="display-4" style={{fontFamily: 'Titan One'}}>Poker </h1>
    <h1 class="display-4" style={{fontFamily: 'Lobster'}}> vs Mr Roboto!</h1>
    <p class="lead">A single player 5 card poker game.</p>
    <hr class="my-4"/>

      <form onSubmit={props.loginSubmit}>
        <input className=" form-control-lg" type="text" value={props.username} placeholder="Enter Username" onChange={props.setUsername}></input>
        <input className="btn btn-primary btn-lg" type="submit" />
      </form>
    </div>
  )
}

export default Login
