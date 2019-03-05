import React, {Component} from 'react';
import { connect } from 'react-redux';

import './Cart.css';

class CartItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: props.qty,
            size: props.size,
            price: props.price
        }
        this.updateQuantity = this.updateQuantity.bind(this);
        this.updateReduxCartQty = this.updateReduxCartQty.bind(this);
    }

    updateQuantity(e){
        this.setState({quantity: e.target.value});
    }

    updateReduxCartQty(){
        const updateCartObjCreator = (quantity, size, props) => {
            let quan;
            if(quantity !== 1){
                quan = Number(quantity);
            } else {
                quan = quantity;
            }
            return {
                type: "UPDATE_CART",
                quantity: quan,
                size: size,
                props: props
            }
        }
        const cartAction = updateCartObjCreator(this.state.quantity, this.state.size, this.props);
        this.props.dispatch(cartAction);
    }

    render() {
        const { props, state } = this;

        return (
            <div className="cart-item">
                <img className="cart-item-image" src={props.imgSrc} alt=""/>
                <h1 className="cart-item-title">{props.title}<br/><sup>$</sup>{state.price} EACH</h1>
                <div className="cart-item-qty-container">
                    <input className="update-cart-quantity" type="number" min="0" value={state.quantity} onChange={this.updateQuantity} /> <div onClick={this.updateReduxCartQty} className="update-cart-button">UPDATE</div>
                </div>  
            </div>
        );
    }
}


const Cart = (props) => {
    let cartItems = props.cart.map(item => <CartItem id={item.props.id} dispatch={props.dispatch} imgSrc={item.props.imgSrc} title={item.props.title + ' - ' + item.size} qty={item.quantity} key={item.props.id + ' ' + item.size} size={item.size} price={item.price} />);
    let cartTotal = 0;
    props.cart.forEach(item => cartTotal += (item.quantity * item.price));
    if(props.visible && props.cart.length > 0){
        return (
            <div id="cart" >
                {cartItems}
                <div id="cart-summary">
                    <h1>Total: <sup>$</sup>{cartTotal}</h1>
                </div>
            </div>
        );
    } else {
        return (
            null
        );
    }
}

const mapStateToProps = state => ({
    visible: state.cartOpened,
    cart: state.cart
});
 
export default connect(mapStateToProps)(Cart);