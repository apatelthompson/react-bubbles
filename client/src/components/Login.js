import React, { useState } from "react";

import axios from "axios";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [auth, setAuth] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setAuth({
      ...auth,
      [e.target.name]: e.target.value
    });
  };

  const login = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", auth)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("token", res.data.payload);
        props.history.push("bubblepage");
      })
      .catch(err => console.log(err.response));
  };

  return (
    <div className="login">
      <h1>Welcome to the Bubble App!</h1>
      <form className="login-form" onSubmit={login}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={auth.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={auth.password}
          onChange={handleChange}
        />
        <button className="form-btn">Log in</button>
      </form>
    </div>
  );
};

export default Login;
