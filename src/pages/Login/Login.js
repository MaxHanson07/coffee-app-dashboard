import React, { useState } from "react";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import InputField from "../../components/InputField/InputField";
import API from "../../utils/API";
import "./Login.scss";

function Login({setLoggedIn, loggedIn}) {
  const [loginFormState, setLoginFormState] = useState({
    username: "",
    password: "",
  });

  const [failure, setFailure] = useState(false)

  const inputChange = (event) => {
    const { name, value } = event.target;
    setLoginFormState({
      ...loginFormState,
      [name]: value,
    });
  };

  const formSubmit = event => {
    event.preventDefault();
    API.login(loginFormState).then(newToken => {
      localStorage.setItem("token", newToken.token)
      setLoggedIn(true)
    }).catch(err=>setFailure(true))
  }

  return (
    <>
      <div className="Login">
        <Header loggedIn={loggedIn}/>
        <form className="LoginForm" onSubmit={formSubmit}>
          <h4>Login</h4>
          <div className="Response">
            {failure ? <p>Incorrect username or password</p>:null}
          </div>
          <InputField
            onChange={inputChange}
            value={loginFormState.username}
            type="text"
            name="username"
            placeholder="username"
          />
          <InputField
            onChange={inputChange}
            value={loginFormState.password}
            type="password"
            name="password"
            placeholder="password"
          />
          <Button className="Btn" name="login" type="submit" value="login" />
        </form>
      </div>
    </>
  );
}

export default Login;
