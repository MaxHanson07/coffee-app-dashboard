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
        </form>
      </div>
    </>
  );
}

export default Login;
