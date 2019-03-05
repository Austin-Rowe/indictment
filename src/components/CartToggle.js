import React, { Component } from 'react';
import { connect } from 'react-redux';

import './CartToggle.css';

class CartToggle extends Component {
    constructor(){
        super();
        this.state = { 
            qty: 1
        }
    }

    cartToggle(){
        this.props.dispatch({type: "TOGGLECART"});
    }
    
    render() { 
        let cartQuantity = 0;
        this.props.cart.forEach(item => cartQuantity += item.quantity);
        if(this.props.cartOpened){
            return (
                <div onClick={this.cartToggle.bind(this)} id="cart-container">
                    <div id="cart-content">
                        <h1 id="cart-x" >X</h1>
                    </div>
                </div>
            );
        }
        return ( 
            <div onClick={this.cartToggle.bind(this)} id="cart-container">
                <div id="cart-content">
                    <img id="cart-image" src="navImages/cart-white.png" alt=""/>
                    <p id="cart-count">{cartQuantity}</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    cart: state.cart,
    cartOpened: state.cartOpened
});
 
export default connect(mapStateToProps)(CartToggle);