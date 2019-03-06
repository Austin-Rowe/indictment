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
    render() {
        const {
            props, 
        } = this;

        let cartItems = props.cart.map((item, i, arr) => {
            if(arr.length - 1 === i){
                return <CartItem id={item.props.id} dispatch={props.dispatch} imgSrc={item.props.imgSrc} title={item.props.title + ' ' + item.props.description + ' - ' + item.size} qty={item.quantity} key={item.props.id + ' ' + item.size} size={item.size} price={item.price} lastItem={true} />
            } else {
                return <CartItem id={item.props.id} dispatch={props.dispatch} imgSrc={item.props.imgSrc} title={item.props.title + ' ' + item.props.description  + ' - ' + item.size} qty={item.quantity} key={item.props.id + ' ' + item.size} size={item.size} price={item.price} />
            }
        });
        let cartTotal = 0;
        props.cart.forEach(item => cartTotal += (item.quantity * item.price));
        if(props.visible && props.cart.length > 0){
            const client = {
                sandbox: "",
                production: "AQW399YSU69nHgXrUQ-G5p8jj0JQMwPW72k3vPgSB1yt2gljKMOgtVJS-d91yD3kClnBmHMUsx20jB8_"
            }
            const onSuccess = () => {
                props.dispatch({type: "PAYMENT"});
            }
        
            const items = props.cart.map(item => ({
                name: item.props.title + ' ' + item.props.description + ' - ' + item.size,
                quantity: item.quantity,
                price: item.price,
                sku: item.props.id,
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
                            <h1 id="cart-summary-total">Total: <sup>$</sup>{cartTotal}</h1>
                            <div id="cart-summary-paypal">
                                <PaypalButton 
                                    client={client}
                                    env={'production'}
                                    commit={true}
                                    currency={'USD'}
                                    total={cartTotal}
                                    items={items}
                                    onSuccess={onSuccess}
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