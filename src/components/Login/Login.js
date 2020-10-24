import React from "react";
import "./Login.css";

function Login({ history }) {
  console.log(history);
  const handleClick = () => {
    history.push("/home");
  };
  return (
    <div id="login">
      <form>
        <h1>Login</h1>
        <div id="form-div">
          <label htmlFor="username">Username</label>
          <div className="inner">
            <input
              type="text"
              placeholder="Username"
              name="username"
              required
            />
          </div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </div>
        <button id="signin-btn" type="submit" onClick={handleClick}>
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
