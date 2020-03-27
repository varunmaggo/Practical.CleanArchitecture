import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import Nav from "./components/Nav/Nav";
import Home from "./containers/Home/Home";
import Products from "./containers/Products/Products";

function App() {
  return (
    <div className="container">
      <Nav />
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/products" component={Products} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
