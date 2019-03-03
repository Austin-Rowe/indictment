import React from 'react';

import './Products.css';
import ProductTile from './ProductTile';

const Products = () => {
    return ( 
        <div id="products-container">
            <ProductTile imgSrc="shirts/Black_Blue.png" title='BLUE ON BLACK' price="99" description="This is a shirt!" />
            <ProductTile imgSrc="shirts/Black_Red.png" title='RED ON BLACK' price="99" description="This is a shirt!" />
            <ProductTile imgSrc="shirts/Black_White.png" title='WHITE ON BLACK' price="99" description="This is a shirt!" />
            <ProductTile imgSrc="shirts/Pink_Shirt.png" title='WHITE ON PINK' price="99" description="This is a shirt!" />
            <ProductTile imgSrc="shirts/Red_Shirt.png" title='BLUE ON RED' price="99" description="This is a shirt!" />
            <ProductTile imgSrc="shirts/Royal_Blue.png" title='WHITE ON BLUE' price="99" description="This is a shirt!" />
            <ProductTile imgSrc="shirts/White_Blue.png" title='BLUE ON WHITE' price="99" description="This is a shirt!" />
            <ProductTile imgSrc="shirts/White_Gray.png" title='GRAY ON WHITE' price="99" description="This is a shirt!" />
            <ProductTile imgSrc="shirts/White_Red.png" title='RED ON WHITE' price="99" description="This is a shirt!" />
        </div>
    );
}
 
export default Products;
