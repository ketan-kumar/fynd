
import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Login from './routes/Login/components/Login';
import Logout from './routes/Logout/components/Logout';
import Movie from './routes/Movie/components/Movie';
import List from './routes/List/components/List';

class App extends React.Component {
  render () {
    return (
      <div className="container">
        <Router>
          <Switch>
            <Route path='/' exact>
            <div className="row">
              <List/>
              </div>
            </Route>
            <Route path="/login">
              <div className="row">
                <Login/>
              </div>
            </Route>
            <Route path="/logout">
              <div className="row">
                <Logout/>
              </div>
            </Route>
            <Route path="/movie">
              <div className="row">
                <Movie/>
              </div>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
