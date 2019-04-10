import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './App.css';
import Products from './components/Products';
import CartToggle from './components/CartToggle';
import Cart from './components/Cart';
import Footer from './components/Footer';

//REDUX FUNCTIONS
import editCart from './redux-functions/editReduxCart';
import toggleCart from './redux-functions/toggleCart';


const initialState = {
  cart: [],
  cartOpened: false,
  paymentCompleted: false
};

function reducer(state = initialState, action){
  switch(action.type){
    case "ADD_TO_CART": return {...state, cart: editCart(state.cart, action)};
    case "UPDATE_CART": return {...state, cart: editCart(state.cart, action), cartOpened: toggleCart(state.cart, state.cartOpened, action)};
    case "TOGGLECART": return {...state, cartOpened: toggleCart(state.cart, state.cartOpened, action), paymentCompleted: false};
    case "PAYMENT": return {...state, paymentCompleted: true};
    default: return state;
  }
}

const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  
);


class App extends Component {
  constructor(){
    super();
    this.state = {}
  }
  
  render() {
    return (
      <Provider store={store}>
        <div>
          <img id="logo" src="navImages/neon-logo.jpg" alt=""/>
          <CartToggle />
          <Cart />          
          <Products />
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;
