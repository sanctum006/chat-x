import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignUp from "./../SignUp/SignUp";
import EditProfile from "./../EditProfile/EditProfile.jsx";
import { useState } from "react";
import { useStateValue } from "../../StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      <Router>
        {user ? (
          <Switch>
            <Route exact path="/">
              <h1>Hello</h1>
            </Route>
            <Route path="/edit-profile">
              <EditProfile />
            </Route>
          </Switch>
        ) : (
          <SignUp />
        )}
      </Router>
    </div>
  );
}

export default App;
