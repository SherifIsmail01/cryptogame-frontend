import React, { Component } from 'react';
import MyRoutes from './config/routes.js';
import './App.css';
import Header from './components/Header.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className='container'>
          { MyRoutes }
        </div>
      </div>
    );
  }
}

export default App;
