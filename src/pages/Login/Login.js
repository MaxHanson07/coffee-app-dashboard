<<<<<<< HEAD
  import React, {useState} from "react";
  import API from "../../utils/API";
  
  function Login({setLoggedIn}) {
  
    const [loginFormState, setLoginFormState] = useState({
      username: "",
      password: ""
    })
  
    const inputChange = event => {
      const { name, value } = event.target;
      setLoginFormState({
        ...loginFormState,
        [name]: value
      })
    }
  
    const formSubmit = event => {
      event.preventDefault();
      API.login(loginFormState).then(newToken => {
        console.log(newToken)
        localStorage.setItem("token", newToken.token)
        setLoggedIn(true)
      }).catch(err=>console.log("Login Failed"))
    }
  
    return (
      <div className="Login">
        <form onSubmit={formSubmit}>
          <input onChange={inputChange} value={loginFormState.username} type="text" name="username" placeholder="username" />
          <input onChange={inputChange} value={loginFormState.password} type="text" name="password" placeholder="password" />
          <input type="submit" value="login" />
=======
import React, { useState } from "react";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import InputField from "../../components/InputField/InputField";
import API from "../../utils/API";
import "./Login.scss";

function Login() {
  const [loginFormState, setLoginFormState] = useState({
    user: "",
    password: "",
  });

  const inputChange = (event) => {
    const { name, value } = event.target;
    setLoginFormState({
      ...loginFormState,
      [name]: value,
    });
  };

  const formSubmit = (event) => {
    event.preventDefault();
    API.login(loginFormState);
  };

  return (
    <>
      <div className="Login">
        <Header />
        <form className="LoginForm" onSubmit={formSubmit}>
          <h4>Login</h4>
          <InputField
            onChange={inputChange}
            value={loginFormState.user}
            type="text"
            name="user"
            placeholder="user"
          />
          <InputField
            onChange={inputChange}
            value={loginFormState.password}
            type="password"
            name="password"
            placeholder="password"
          />
          <Button className="Btn" name="login" type="submit" value="login" />
>>>>>>> dev
        </form>
      </div>
    </>
  );
}

export default Login;
