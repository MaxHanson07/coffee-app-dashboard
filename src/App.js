// import React from "react";
// import Dashboard from "./pages/Dashboard/Dashboard";

// import Login from "./pages/Login/Login";
  // const [profileState, setProfileState] = useState({
  //   name: "",
  //   email: "",
  //   id: "",
  //   isLoggedIn: false
  // })



import React, {useState} from "react";
import API from "./utils/API";

function App() {

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
    <div className="App">
      <form onSubmit={formSubmit}>
        <input onChange={inputChange} value={loginFormState.email} type="text" name="email" placeholder="email" />
        <input onChange={inputChange} value={loginFormState.password} type="text" name="password" placeholder="password" />
        <input type="submit" value="login" />
      </form>
    </div>
  );
}

export default App;

// function App() {
//   return
//   <Login/>; 
//   // <Dashboard />;
// }

// export default App;
