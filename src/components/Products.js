import React from 'react';
import { connect } from 'react-redux';


import './Products.css';
import ProductTile from './ProductTile';

const Products = (props) => {
    return ( 
        <div id="products-container">
            <ProductTile id={1} title="TICK TOCK HOURGLASS THERMAL" dispatch={props.dispatch} imgSrc="shirts/Black_Blue.png" description='BLUE ON BLACK' price={34} />
            <ProductTile id={2} title="TICK TOCK HOURGLASS THERMAL" dispatch={props.dispatch} imgSrc="shirts/Black_Red.png" description='RED ON BLACK' price={34} />
            <ProductTile id={3} title="TICK TOCK HOURGLASS THERMAL" dispatch={props.dispatch} imgSrc="shirts/Black_White.png" description='WHITE ON BLACK' price={34} />
            <ProductTile id={4} title="TICK TOCK HOURGLASS THERMAL" dispatch={props.dispatch} imgSrc="shirts/Pink_Shirt.png" description='WHITE ON PINK' price={34} />
            <ProductTile id={5} title="TICK TOCK HOURGLASS THERMAL" dispatch={props.dispatch} imgSrc="shirts/Red_Shirt.png" description='BLUE ON RED' limitedEdition price={38} />
            <ProductTile id={6} title="TICK TOCK HOURGLASS THERMAL" dispatch={props.dispatch} imgSrc="shirts/Royal_Blue.png" description='WHITE ON BLUE' price={34} />
            <ProductTile id={7} title="TICK TOCK HOURGLASS THERMAL" dispatch={props.dispatch} imgSrc="shirts/White_Blue.png" description='BLUE ON WHITE' price={34} />
            <ProductTile id={8} title="TICK TOCK HOURGLASS THERMAL" dispatch={props.dispatch} imgSrc="shirts/White_Gray.png" description='GRAY ON WHITE' price={34} />
            <ProductTile id={9} title="TICK TOCK HOURGLASS THERMAL" dispatch={props.dispatch} imgSrc="shirts/White_Red.png" description='RED ON WHITE' price={34} />
        </div>
    );
}
 
export default connect()(Products);
