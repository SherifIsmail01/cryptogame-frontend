import React, { Component } from 'react';
import AppRoutes from './config/routes.js';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';

function App() {
    return (
      <div className="app-core-wrapper">
        <Header />
          <div className='container'>
            <AppRoutes />
          </div>
        <Footer />
      </div>
    );
}

export default App;
