import React, {useState} from "react";

import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Link, 
  Route
} from "react-router-dom";
import Meals from "./components/Meals"
import About from "./components/About"
import Home from "./components/Home"
import Meal from "./components/Meal"
import CreateMeal from "./components/CreateMeal";


function App() {

  return (
    <Router>
    <div container="app-container">
        <div className="nav-main">
            <div className="brand-container">
                <h1 className="brand">Meal Sharing App</h1>
            </div>
        <div className="nav-container">
            <ul className="nav-ul">
                <li>
                <Link to="/">Home</Link>
                </li>
                <li>
                <Link to="/about">About</Link>
                </li>
                <li>
                <Link to="/meals">Meals</Link>
                </li>
                <li>
                <Link to="/host">Be a host</Link>
                </li>
            </ul>
        </div>
    </div>
    </div>

    <Switch>
        <Route exact path="/">
            <Home />
        </Route>
        <Route path="/about">
            <About />
        </Route>
        <Route exact path="/meals">
            <Meals />
        </Route>
        <Route exact path="/meals/:id">
            <Meal />
        </Route>
        <Route exact path="/host">
            <CreateMeal />
        </Route>
     </Switch>
</Router>   
  );
}

export default App;
