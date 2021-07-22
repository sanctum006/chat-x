import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignUp from "./../SignUp/SignUp";
import { useState } from "react";
import { useStateValue } from "../../StateProvider";

function App() {
  const [asd, dispatch] = useStateValue();

  const [user, setUser] = useState(null);
  return (
    <div className="app">
      <Router>
        {user ? (
          <Switch>
            <Route path="/login">{/* <Login /> */}</Route>
          </Switch>
        ) : (
          <SignUp />
        )}
      </Router>
    </div>
  );
}

export default App;
