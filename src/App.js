import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Editor from "./Editor";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/editor/:pageId" component={Editor}></Route>
      </Switch>
    </Router>
  );
}

export default App;
