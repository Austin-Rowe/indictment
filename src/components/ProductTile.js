import React from 'react';


import './ProductTile.css';

class ProductTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'XS',
            quantity: 1, 
            price: props.price
        }

        this.updateQuantity = this.updateQuantity.bind(this);
        this.updateSize = this.updateSize.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    updateQuantity(event){
        this.setState({quantity: event.target.value})
    }

    updateSize(event){
        const { props, state } = this;
        this.setState({size: event.target.innerText, price: props.price});
        if(event.target.innerText === "XXL" ){
            this.setState({price: props.price + 2});
        } 
    }

    addToCart(){
        const addToCartObjCreator = (quantity, size, price, props) => {
            let quan;
            if(quantity !== 1){
                quan = Number(quantity);
            } else {
                quan = quantity;
            }
            return {
                type: "ADD_TO_CART",
                quantity: quan,
                size: size,
                price: price,
                props: props
            }
        }
        const cartAction = addToCartObjCreator(this.state.quantity, this.state.size, this.state.price, this.props);
        this.props.dispatch(cartAction);
    }

    render() {
        const { props, state } = this;
        return ( 
            <div className="product-tile-container">
                <img src={props.imgSrc} className="product-tile-image" alt="" />
                <h1>{props.title}</h1>
                <h2>{props.description}</h2>
                <h1><sup>$</sup>{state.price}</h1>
                <ul className="size-selector">
                    <li onClick={this.updateSize} className={state.size === "XS"? 'selected' : ''}>XS</li>
                    <li onClick={this.updateSize} className={state.size === "S"? 'selected' : ''}>S</li>
                    <li onClick={this.updateSize} className={state.size === "M"? 'selected' : ''}>M</li>
                    <li onClick={this.updateSize} className={state.size === "L"? 'selected' : ''}>L</li>
                    <li onClick={this.updateSize} className={state.size === "XL"? 'selected' : ''}>XL</li>
                    <li onClick={this.updateSize} className={state.size === "XXL"? 'selected' : ''}>XXL</li>
                </ul>                
                <div className="add-to-cart-container">
                    <input className="add-to-cart-quantity" type="number" min="1" value={state.quantity} onChange={this.updateQuantity} /> <div onClick={this.addToCart} className="add-to-cart-button">ADD TO CART</div>
                </div>        
            </div>
        );
    }
}
 
export default ProductTile;