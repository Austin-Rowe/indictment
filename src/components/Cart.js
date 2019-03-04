import React, {Component} from 'react';

import './Cart.css';

class CartItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            props,
        } = this;

        return (
            <div className="cart-item">
                <img className="cart-item-image" src={props.img} alt=""/>
                <h1 className="cart-item-title">{props.title}</h1>
                <div className="cart-item-qty-container">
                    <input className="update-cart-quantity" type="number" min="0" value={props.qty} placeholder="QTY" /> <div className="update-cart-button">UPDATE</div>
                </div>  
            </div>
        );
    }
}


const Cart = () => {
    return ( 
        <div id="cart">
            <div id="cart-summary">
                <h1>Total: <sup>$</sup>129<sup>95</sup></h1>
            </div>
            <CartItem img="shirts/Black_Blue.png" title="Tick Tock Hourglass Thermal - Blue on Black MEDIUM" qty="3" />
            <CartItem img="shirts/Black_Blue.png" title="Tick Tock Hourglass Thermal - Blue on Black MEDIUM" qty="3" />
            <CartItem img="shirts/Black_Blue.png" title="Tick Tock Hourglass Thermal - Blue on Black MEDIUM" qty="3" />
            <CartItem img="shirts/Black_Blue.png" title="Tick Tock Hourglass Thermal - Blue on Black MEDIUM" qty="3" />
            <CartItem img="shirts/Black_Blue.png" title="Tick Tock Hourglass Thermal - Blue on Black MEDIUM" qty="3" />
            <CartItem img="shirts/Black_Blue.png" title="Tick Tock Hourglass Thermal - Blue on Black MEDIUM" qty="3" />
            <CartItem img="shirts/Black_Blue.png" title="Tick Tock Hourglass Thermal - Blue on Black MEDIUM" qty="3" />
            <CartItem img="shirts/Black_Blue.png" title="Tick Tock Hourglass Thermal - Blue on Black MEDIUM" qty="3" />
        </div>
    );
}
 
export default Cart;