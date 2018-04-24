import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar';
import { Switch, Route } from 'react-router-dom'

import Home from './home/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <AppBar title="DMdium" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
          <main>
            <Switch>
              <Route exact path='/' component={Home}/>
            </Switch>
          </main>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
