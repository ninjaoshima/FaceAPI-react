import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './components/Login';
import Face from './components/Face';
import './App.css';


class App extends Component {  
  render() {
    return (
      <div className="container">
        <Route exact path="/" component={Login} />
        <Route path="/face" component={Face}/>
      </div>
    );
  }
}

export default App;
