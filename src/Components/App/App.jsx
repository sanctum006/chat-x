import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Login from "../Login/Login";
import SignUp from "./../SignUp/SignUp";
import EditProfile from "./../EditProfile/EditProfile.jsx";
import { useState } from "react";
import { useStateValue } from "../../StateProvider";
import CreateAccount from "../CreateAccount/CreateAccount";
import HomeScreen from "../HomeScreen/HomeScreen";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {/* <Router>
        <Switch>
          <Route exact path="/">
            {user ? <HomeScreen /> : <SignUp />}
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/create-account">
            <CreateAccount />
          </Route>
          {user ? (
            <Route path="/edit-profile">
              <EditProfile />
            </Route>
          ) : (
            <Redirect to="/" />
          )}
        </Switch>
      </Router> */}
    </div>
  );
}

export default App;
