import React, { Component } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Forum from "./forum";
import Home from "./home";
import Reactlist from "./reactlist";

class App extends Component {
  state = { users: [] };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route component={Forum} path="/forum" />
            <Route component={Reactlist} path="/reactlist" />

            {/* always keep root route last */}
            <Route component={Home} path="/" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
