import React from "react";
import {
  BrowserRouter,

  Route,
  Switch,

} from "react-router-dom";

import history from "../helpers/history";
import MainContainer from './MainContainer'
import Room from "../components/Room";
import CreateRoom from "../components/CreateRoom";

function App() {

  return (
    <BrowserRouter history={history}>
      <Switch>

        <Route path="/" exact component={CreateRoom} />
        <Route path='/test' component={MainContainer} />
        <Route path="/room/:roomID" component={Room} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
