import React, { Component } from 'react';

import './App.css';
import Products from './components/Products';
import CartToggle from './components/CartToggle';
import Footer from './components/Footer';


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <img id="logo" src="navImages/indictment-logo.png" alt=""/>
        <CartToggle />
        <Products />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
