import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';

import './App.css';
import Products from './components/Products';
import CartToggle from './components/CartToggle';
import Cart from './components/Cart';
import Footer from './components/Footer';

//REDUX FUNCTIONS
import editCart from './redux-functions/editReduxCart';
import toggleCart from './redux-functions/toggleCart';

import getTotal from './functions/getTotal';
import getCartCount from './functions/getCartCount';

const initialState = {
  cart: [],
  cartOpened: false,
  paymentCompleted: false
};

function reducer(state = initialState, action){
  switch(action.type){
    case "ADD_TO_CART": 
    ReactGA.event({
      category: "Cart",
      action: `User Added To Cart Total: $${getTotal(state.cart, action)} CartCount: ${getCartCount(state.cart, action)}`
    })
    return {
      ...state, 
      cart: editCart(state.cart, action)
    };
    case "UPDATE_CART": return {
      ...state, 
      cart: editCart(state.cart, action), 
      cartOpened: toggleCart(state.cart, state.cartOpened, action)
    };
    case "TOGGLECART": return {
      ...state, 
      cartOpened: toggleCart(state.cart, state.cartOpened, action), 
      paymentCompleted: false
    };
    case "PAYMENT": 
    ReactGA.event({
      category: "Transaction",
      action: `User paid $${getTotal(state.cart)} for ${getCartCount(state.cart)} item(s) exlcluding shipping`
    });
    return {
      ...state, 
      paymentCompleted: true
    };
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

  componentDidMount(){
    ReactGA.initialize('UA-149455210-3');
    ReactGA.pageview('/home');
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
