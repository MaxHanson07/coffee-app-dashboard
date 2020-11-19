// import React from "react";
// import "./Login.scss";

// class Form extends Component {
//   // Setting the component's initial state
//   state = {
//     userName: "",
//     password: "",
//   };

//   handleInputChange = (event) => {
//     // Getting the value and name of the input which triggered the change
//     let value = event.target.value;
//     const name = event.target.name;

//     if (name === "password") {
//       value = value.substring(0, 15);
//     }
//     // Updating the input's state
//     this.setState({
//       [name]: value,
//     });
//   };

//   handleFormSubmit = (event) => {
//     event.preventDefault();
//     if (!this.state.firstName || !this.state.lastName) {
//       alert("Fill out your first and last name please!");
//     } else if (this.state.password.length < 6) {
//       alert(
//         `Choose a more secure password ${this.state.firstName} ${this.state.lastName}`
//       );
//     } else {
//       alert(`Hello ${this.state.UserName}`);
//     }

//     this.setState({
//       userName: "",
//       password: "",
//     });
//   };

//   render() {
//     return (
//       <div>
//         <p>Hello {this.state.UserName}</p>
//         <form className="form">
//           <input
//             value={this.state.userName}
//             name="firstName"
//             onChange={this.handleInputChange}
//             type="text"
//             placeholder="Username"
//           />
//           <input
//             value={this.state.password}
//             name="password"
//             onChange={this.handleInputChange}
//             type="password"
//             placeholder="Password"
//           />
//           <button onClick={this.handleFormSubmit}>Submit</button>
//         </form>
//       </div>
//     );
//   }
// }

// export default Form;

import React, {useState} from "react";
import API from "../../utils/API"

function Login() {

  const [loginFormState, setLoginFormState] = useState({
    email: "",
    password: ""
  })

  // const [profileState, setProfileState] = useState({
  //   name: "",
  //   email: "",
  //   id: "",
  //   isLoggedIn: false
  // })

  // useEffect(fetchUserData, [])

  // function fetchUserData() {
  //   const token = localStorage.getItem("token");
  //   API.getProfile(token).then(profileData => {
  //     if (profileData) {
  //       setProfileState({
  //         name: profileData.name,
  //         email: profileData.email,
  //         token: token,
  //         id: profileData.id,
  //         isLoggedIn: true
  //       })
  //     } else {
  //       localStorage.removeItem("token");
  //       setProfileState({
  //         name: "",
  //         email: "",
  //         token: "",
  //         id: "",
  //         isLoggedIn: false
  //       })
  //     }
  //   }
  //   )
  // }

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
      // API.getProfile(newToken.token).then(profileData => {
      //   setProfileState({
      //     name: profileData.name,
      //     email: profileData.email,
      //     id: profileData.id,
      //     isLoggedIn: true
      //   })
      // })
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