import React from 'react';
import Tetris from "./components/Tetris/Tetris";
import Home from "./components/Home/Home"
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = () => {
  return <div className="app">
    <BrowserRouter>
      <Switch>
        <Route exact path="/game">
          <Tetris />  
        </Route>
        <Route path="/">
          <Home />  
        </Route>
      </Switch>
    </BrowserRouter>
  </div>
}

export default App;