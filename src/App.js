import './App.css';
import { Switch, Route, Redirect, useHistory } from "react-router-dom";

import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Userpage from './components/Userpage/Userpage';

function App() {
  const { push } = useHistory();
  return (
    <Switch>
      <Route exact path="/register">
        <Signup push={push} />
      </Route>
      <Route exact path="/login">
        <Login push={push} />
      </Route>
      <Route exact path="/userpage">
        <Userpage push={push} />
      </Route>
      <Route path="/" >
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
}

export default App;
