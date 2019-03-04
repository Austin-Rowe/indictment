import React from 'react';

import './ProductTile.css';

class ProductTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'XS',
            quantity: null
        }

        this.updateQuantity = this.updateQuantity.bind(this);
        this.updateSize = this.updateSize.bind(this);
    }

    updateQuantity(event){
        this.setState({quantity: event.target.value})
    }

    updateSize(event){
        this.setState({size: event.target.innerText})
    }

    render() {
        const { props, state } = this;

        return ( 
            <div className="product-tile-container">
                <img src={props.imgSrc} className="product-tile-image"/>
                <h1>{props.title}</h1>
                <h1><sup>$</sup>{props.price}<sup>99</sup>{state.size === 'XL' || state.size === 'XXL'?  <div style={{fontSize: '15px'}}>ADD <sup>$</sup>2</div> : null}</h1>
                <ul className="size-selector">
                    <li onClick={this.updateSize} className={state.size === "XS"? 'selected' : ''}>XS</li>
                    <li onClick={this.updateSize} className={state.size === "S"? 'selected' : ''}>S</li>
                    <li onClick={this.updateSize} className={state.size === "M"? 'selected' : ''}>M</li>
                    <li onClick={this.updateSize} className={state.size === "L"? 'selected' : ''}>L</li>
                    <li onClick={this.updateSize} className={state.size === "XL"? 'selected' : ''}>XL</li>
                    <li onClick={this.updateSize} className={state.size === "XXL"? 'selected' : ''}>XXL</li>
                </ul>                
                <div className="add-to-cart-container">
                    <input className="add-to-cart-quantity" type="number" min="0" value={state.quantity} onChange={this.updateQuantity} placeholder="QTY" /> <div className="add-to-cart-button">ADD TO CART</div>
                </div>        
            </div>
        );
    }
}
 
export default ProductTile;