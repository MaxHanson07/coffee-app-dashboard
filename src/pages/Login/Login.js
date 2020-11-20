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
        </form>
      </div>
    );
  }
  
  export default Login;