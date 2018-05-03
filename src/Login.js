import React from "react"

const Login = (props) => {
  return (
    <div className="login">
      <form onSubmit={props.loginSubmit}>
        <input type="text" value={props.username} placeholder="username" onChange={props.usernameChange}></input>
        <input type="submit" />
      </form>
    </div>
  )
}

export default Login
