import React, { Component } from 'react';
import MyRoutes from './config/routes.js';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
          <div className='container'>
            { MyRoutes }
          </div>
        <Footer />
      </div>
    );
  }
}

export default App;
