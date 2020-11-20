import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import React, {useState} from "react";
import { Switch, BrowserRouter as Router, Route, Redirect } from "react-router-dom";

function App() {

const [loggedIn, setLoggedIn] = useState(true)

  return (
    <div className="App">
      <Router>
        <Switch>
          {loggedIn ? (
          <Route exact path="/" >
            <Dashboard setLoggedIn={setLoggedIn} />
            </Route>
          ): (
            <Route exact path="/" >
            <Login setLoggedIn={setLoggedIn} />
            </Route>          )}
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;