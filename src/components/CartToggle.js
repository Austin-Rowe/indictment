import React, { Component } from 'react';

import './CartToggle.css';

class CartToggle extends Component {
    constructor(){
        super();
        this.state = { 
            qty: 1
        }
        this.increment = this.increment.bind(this);
    }
    
    increment(){
        this.setState(state => ({qty: state.qty + 1}))
    }

    render() { 
        return ( 
            <div id="cart-container" onClick={this.increment}>
                <div id="cart-content">
                    <img id="cart-image" src="navImages/cart-white.png" alt=""/>
                    <p id="cart-count">{this.state.qty}</p>
                </div>
            </div>
        );
    }
}
 
export default CartToggle;