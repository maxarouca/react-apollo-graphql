import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from '../pages/Home'


function AppRouter() {
  return (
    <Router>
        <Route path="/" exact component={Home} />
        {/* <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} /> */}
    </Router>
  );
}

export default AppRouter;