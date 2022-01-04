import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Components/Header/Header";
import Homepage from "./Components/Homepage/Homepage";
import Explore from "./Components/Explore/Explore";
import Notfound from "./Components/Notfound/Notfound";
import MyObs from "./Components/MyObs/MyObs";
import AddObservation from "./Components/AddObservation/AddObservation";
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
            <Route path="/myobs" exact component={MyObs} />
            <Route
              path="/myobs/addObservation"
              exact
              component={AddObservation}
            />
            <Route component={Notfound} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
