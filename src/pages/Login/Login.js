  import React, {useState} from "react";
  import API from "../../utils/API";
  
  function Login() {
  
    const [loginFormState, setLoginFormState] = useState({
      email: "",
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
  
      })
    }
  
  
    return (
      <div className="Login">
        <form onSubmit={formSubmit}>
          <input onChange={inputChange} value={loginFormState.email} type="text" name="email" placeholder="email" />
          <input onChange={inputChange} value={loginFormState.password} type="text" name="password" placeholder="password" />
          <input type="submit" value="login" />
        </form>
      </div>
    );
  }
  
  export default Login;