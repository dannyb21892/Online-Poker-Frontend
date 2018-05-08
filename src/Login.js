import React from "react"

const Login = (props) => {
  return (
    <div className="login">
      <form onSubmit={props.loginSubmit}>
        <input className=" form-control-lg" type="text" value={props.username} placeholder="Enter Username" onChange={props.setUsername}></input>
        <input className="btn btn-primary btn-lg" type="submit" />
      </form>
    </div>
  )
}

export default Login
