import React from 'react';
import { connect } from 'react-redux';


import './Products.css';
import ProductTile from './ProductTile';

const Products = (props) => {
    return ( 
        <div id="products-container">
            <ProductTile id={1} dispatch={props.dispatch} imgSrc="shirts/Black_Blue.png" title='BLUE ON BLACK' price={34} description="This is a shirt!" />
            <ProductTile id={2} dispatch={props.dispatch} imgSrc="shirts/Black_Red.png" title='RED ON BLACK' price={34} description="This is a shirt!" />
            <ProductTile id={3} dispatch={props.dispatch} imgSrc="shirts/Black_White.png" title='WHITE ON BLACK' price={34} description="This is a shirt!" />
            <ProductTile id={4} dispatch={props.dispatch} imgSrc="shirts/Pink_Shirt.png" title='WHITE ON PINK' price={34} description="This is a shirt!" />
            <ProductTile id={5} dispatch={props.dispatch} imgSrc="shirts/Red_Shirt.png" title='BLUE ON RED' price={34} description="This is a shirt!" />
            <ProductTile id={6} dispatch={props.dispatch} imgSrc="shirts/Royal_Blue.png" title='WHITE ON BLUE' price={34} description="This is a shirt!" />
            <ProductTile id={7} dispatch={props.dispatch} imgSrc="shirts/White_Blue.png" title='BLUE ON WHITE' price={34} description="This is a shirt!" />
            <ProductTile id={8} dispatch={props.dispatch} imgSrc="shirts/White_Gray.png" title='GRAY ON WHITE' price={34} description="This is a shirt!" />
            <ProductTile id={9} dispatch={props.dispatch} imgSrc="shirts/White_Red.png" title='RED ON WHITE' price={34} description="This is a shirt!" />
        </div>
    );
}
 
export default connect()(Products);
