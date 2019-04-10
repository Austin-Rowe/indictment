import React, {Component} from 'react';
import { connect } from 'react-redux';

import './Cart.css';
import PaypalButton from './PaypalButton';

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
            <div className={props.lastItem? "last cart-item" : "cart-item"}>
                <img className="cart-item-image" src={props.imgSrc} alt=""/>
                <h1 className="cart-item-title">{props.title}<br/><sup>$</sup>{state.price} EACH</h1>
                <div className="cart-item-qty-container">
                    <input className="update-cart-quantity" type="number" min="0" value={state.quantity} onChange={this.updateQuantity} /> <div onClick={this.updateReduxCartQty} className="update-cart-button">UPDATE</div>
                </div>  
            </div>
        );
    }
}


class Cart extends Component {

    constructor(props){
        super(props);
        this.state = {
            international: false
        }

        this.toggleIntl = this.toggleIntl.bind(this);
    }

    toggleIntl(){
        this.setState(state => ({international: !state.international}));
    }

    render() {
        const {
            props, 
            state
        } = this;

        let cartItems = props.cart.map((item, i, arr) => {
            if(arr.length - 1 === i){
                return <CartItem id={item.props.id} dispatch={props.dispatch} imgSrc={item.props.imgSrc} title={item.props.title + ' ' + item.props.description + ' - ' + item.size} qty={item.quantity} key={item.props.id + ' ' + item.size} size={item.size} price={item.price} lastItem={true} />
            } else {
                return <CartItem id={item.props.id} dispatch={props.dispatch} imgSrc={item.props.imgSrc} title={item.props.title + ' ' + item.props.description  + ' - ' + item.size} qty={item.quantity} key={item.props.id + ' ' + item.size} size={item.size} price={item.price} />
            }
        });
        
        const shippingCalculator = (count, international) => {
            if(international){
                return 24;
            } else {
                switch(count){
                    case 1: return 5;
                    case 2: return 7;
                    case 3: return 10;
                    case 4: return 12;
                    case 5: return 12;
                    case 6: return 12;
                    case 7: return 12;
                    case 8: return 12;
                    default: return 20;
                }
            }
        }
        let cartCount = 0;
        let subTotal = 0;
        props.cart.forEach(item => {subTotal += (item.quantity * item.price); cartCount += Number(item.quantity);});
        const shipping = shippingCalculator(cartCount, state.international);
        const cartTotal = shipping + subTotal;
        if(props.visible && props.cart.length > 0){
            const client = {
                sandbox: "AUQXEtmV08orxT5B9AURUh2JsmgMe4WwRfTp53vu8OxLBWl9-d705QlZSn5LlnOP3sx5mNtLOIYENLMg",
                production: "AQW399YSU69nHgXrUQ-G5p8jj0JQMwPW72k3vPgSB1yt2gljKMOgtVJS-d91yD3kClnBmHMUsx20jB8_"
            }
            const details = {
                subtotal: subTotal,
                shipping: `${shipping}.00`
            }
            const onSuccess = () => {
                props.dispatch({type: "PAYMENT"});
            }
        
            const items = props.cart.map(item => ({
                name: item.props.title + ' ' + item.props.description + ' - ' + item.size,
                quantity: item.quantity,
                price: item.price,
                sku: item.props.id + item.size,
                currency: 'USD'
            }));

            return (
                <div id="cart" >
                    {cartItems}
                    {props.paymentCompleted? 
                        <div id="payment-confirmation-container">
                            <div id="payment-confirmation-statement">
                                <h1>
                                    Thank you for your purchase!    
                                </h1>
                                <h3>
                                    We will email you with order details and shipping information shortly.
                                </h3>
                            </div>
                        </div>
                        :
                        null
                    }
                    <div id="cart-summary">
                        <div id="cart-summary-content">
                            <h1 id="cart-summary-total">Total: <sup>$</sup>{subTotal} + <sup>$</sup>{shipping}<sup id="shipping">shipping</sup></h1>
                            <button id="intl-shipping-button" onClick={this.toggleIntl}>{state.international? "CLICK IF ORDER IS WITHIN USA" : "ORDERS OUTSIDE USA CLICK HERE"}</button>
                            <div id="cart-summary-paypal">
                                <PaypalButton 
                                    client={client}
                                    env={'production'}
                                    commit={true}
                                    currency={'USD'}
                                    total={cartTotal}
                                    items={items}
                                    onSuccess={onSuccess}
                                    details={details}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                null
            );
        }
    }
}

const mapStateToProps = state => ({
    visible: state.cartOpened,
    cart: state.cart,
    paymentCompleted: state.paymentCompleted
});
 
export default connect(mapStateToProps)(Cart);