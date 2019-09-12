import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from '../pages/Home'
import Station from '../pages/Station'


function AppRouter() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/station/:number" component={Station} />
    </Router>
  );
}

export default AppRouter;