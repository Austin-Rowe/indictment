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
                <h1 className="cart-item-title">{props.title}<br/><sup>$</sup>{props.id === 19? (state.price + 0.2).toFixed(2) : state.price} EACH</h1>
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
            international: false,
            discountCodeValue: "",
            closerFamily: false
        }

        this.toggleIntl = this.toggleIntl.bind(this);
        this.handleDiscountInput = this.handleDiscountInput.bind(this);
        this.applyDiscountCode = this.applyDiscountCode.bind(this);
    }
  
    toggleIntl(){
        this.setState(state => ({international: !state.international}));
    }

    handleDiscountInput(event){
        this.setState({discountCodeValue: event.target.value});
    }

    applyDiscountCode(){
        const capDiscountCode = this.state.discountCodeValue.toUpperCase();
        console.log("apply discount code: " + capDiscountCode );
        if(capDiscountCode === "CLOSERFAMILY"){
            this.setState({closerFamily: true});
        }
    }

    render() {
        const {
            props, 
            state
        } = this;

        let cartItems = props.cart.map((item, i, arr) => {
            if(arr.length - 1 === i){
                if(item.props.itemType === "HAT"){
                    return <CartItem id={item.props.id} dispatch={props.dispatch} imgSrc={item.props.imgSrc} title={item.props.title + ' ' + item.props.description} qty={item.quantity} key={item.props.id} size={item.size} neck={item.neck} price={item.price} lastItem={true} />
                }
                return <CartItem id={item.props.id} dispatch={props.dispatch} imgSrc={item.props.imgSrc} title={item.props.title + ' ' + item.props.description + ' - ' + item.size + `(${item.neck})`} qty={item.quantity} key={item.props.id + ' ' + item.size} size={item.size} neck={item.neck} price={item.price} lastItem={true} />
            } else {
                if(item.props.itemType === "HAT"){
                    return <CartItem id={item.props.id} dispatch={props.dispatch} imgSrc={item.props.imgSrc} title={item.props.title + ' ' + item.props.description} qty={item.quantity} key={item.props.id} size={item.size} neck={item.neck} price={item.price} />
                }
                return <CartItem id={item.props.id} dispatch={props.dispatch} imgSrc={item.props.imgSrc} title={item.props.title + ' ' + item.props.description  + ' - ' + item.size + `(${item.neck})`} qty={item.quantity} key={item.props.id + ' ' + item.size} size={item.size} neck={item.neck} price={item.price} />
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

        const subTotalCalculator = (closerFamily, cart) => {
            let shirtCount = 0;
            let count = 0;
            let total = 0;
            let discount = 0;
            let cents = 0;

            const returnDiscount = (count) => {
                switch(count){
                    case 5: return 28;
                    case 6: return 28;
                    case 7: return 28;
                    case 8: return 28;
                    case 9: return 28;
                    case 10: return 56;
                    case 11: return 56;
                    case 12: return 56;
                    case 13: return 56;
                    case 14: return 56;
                    case 15: return 84;
                    default: return 0;
                }
            };

            cart.forEach(item => {
                if(item.props.itemType === "SHIRT"){
                    shirtCount += Number(item.quantity);
                }
                count += Number(item.quantity);
                total += (item.quantity * item.price);
                if(item.props.id === 19){
                    cents += (item.quantity * 20);
                }
            });

            if(closerFamily){
                discount = returnDiscount(shirtCount);
            }

            total = total - discount;

            cents = (cents/100);

            return {
                total: (total + cents).toFixed(2),
                count: count,
                discount: discount
            }
        };

        const subTotalObj = subTotalCalculator(this.state.closerFamily, props.cart);
        let cartCount = subTotalObj.count;
        let subTotal = subTotalObj.total;
        /* props.cart.forEach(item => {subTotal += (item.quantity * item.price); cartCount += Number(item.quantity);}); */
        const shipping = shippingCalculator(cartCount, state.international);
        const cartTotal = shipping + parseFloat(subTotal);
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
        
            const items = props.cart.map(item => {
                if(item.props.id === 19){
                    return {
                        name: item.props.title + ' ' + item.props.description + ' - ' + item.size,
                        quantity: item.quantity,
                        price: item.price + 0.2,
                        sku: item.props.id + item.size + item.neck,
                        currency: 'USD'
                    }
                } else {
                    return {
                        name: item.props.title + ' ' + item.props.description + ' - ' + item.size,
                        quantity: item.quantity,
                        price: item.price,
                        sku: item.props.id + item.size + item.neck,
                        currency: 'USD'
                    }
                }
            });

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
                                <div id="discount-code-container">
                                    <input id="discount-code-input" type="text" onChange={this.handleDiscountInput} value={this.state.discountCodeValue} placeholder="COUPON CODE" />
                                    <button id="discount-code-button" onClick={this.applyDiscountCode}>APPLY</button>
                                </div>
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