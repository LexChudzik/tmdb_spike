import React, { Component } from 'react';
import Display from '../Display/Display';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import Search from '../Search/Search'

import './App.css';

class App extends Component {

  render() {
    return (
      <Router>
      <div>
      <Route exact path="/" component={Search} />
      </div>
    </Router>
    );
  }
  
}

export default App;
