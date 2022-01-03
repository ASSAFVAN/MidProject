import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Components/Header/Header";
import Homepage from "./Components/Homepage/Homepage";
import Explore from "./Components/Explore/Explore";
import Notfound from "./Components/Notfound/Notfound";
import MyObs from "./Components/MyObs/MyObs";
// import Mockupapi from "./APIs/api";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/explore" exact component={Explore} />
            <Route path="/myobs" component={MyObs} />
            <Route component={Notfound} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
