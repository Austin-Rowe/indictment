import React from 'react';
import { connect } from 'react-redux';


import './Products.css';
import ProductTile from './ProductTile';

class Products extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            props,
        } = this;
        return ( 
            <div id="products-container">
                <ProductTile id={20} title="LIBERTY + JUSTICE = FOR ALL" dispatch={props.dispatch} imgSrc="short-sleeve-edits/liberty-justice-for-all.jpg" description='' itemType="SHIRT" noVneck price={38} />
                <ProductTile id={19} title="DECLAS SHIRT" dispatch={props.dispatch} imgSrc="short-sleeve-edits/declas.jpg" description='' itemType="SHIRT" price={20} />
                <ProductTile id={17} title="INDICTMENT CLOTHING HAT" dispatch={props.dispatch} imgSrc="short-sleeve-edits/RedIndictmentLogoCap.jpg" description='RED ON BLACK' itemType="HAT" price={24} />

                <ProductTile id={7} title="TICK TOCK HOURGLASS T-SHIRT" dispatch={props.dispatch} imgSrc="short-sleeve-edits/Orange_Blue.jpg" description='ORANGE ON BLUE' itemType="SHIRT" price={28} />
                <ProductTile id={9} title="TICK TOCK HOURGLASS T-SHIRT" dispatch={props.dispatch} imgSrc="short-sleeve-edits/Orange_Teal.jpg" description='ORANGE ON TURQUOISE' itemType="SHIRT" price={28} />
                <ProductTile id={10} title="TICK TOCK HOURGLASS T-SHIRT" dispatch={props.dispatch} imgSrc="short-sleeve-edits/Orange_White.jpg" description='ORANGE ON WHITE' itemType="SHIRT" price={28} />
                <ProductTile id={11} title="TICK TOCK HOURGLASS T-SHIRT" dispatch={props.dispatch} imgSrc="short-sleeve-edits/Pink_Black.jpg" description='PINK ON BLACK' itemType="SHIRT" price={28} />
                <ProductTile id={12} title="TICK TOCK HOURGLASS T-SHIRT" dispatch={props.dispatch} imgSrc="short-sleeve-edits/Pink_Blue.jpg" description='PINK ON BLUE' itemType="SHIRT" price={28} />
                <ProductTile id={13} title="TICK TOCK HOURGLASS T-SHIRT" dispatch={props.dispatch} imgSrc="short-sleeve-edits/Pink_Gray.jpg" description='PINK ON GRAY' itemType="SHIRT" price={28} />
                <ProductTile id={14} title="TICK TOCK HOURGLASS T-SHIRT" dispatch={props.dispatch} imgSrc="short-sleeve-edits/Pink_Teal.jpg" description='PINK ON TURQUOISE' itemType="SHIRT" price={28} />
                <ProductTile id={15} title="TICK TOCK HOURGLASS T-SHIRT" dispatch={props.dispatch} imgSrc="short-sleeve-edits/Pink_White.jpg" description='PINK ON WHITE' itemType="SHIRT" price={28} />
            </div>
        );
    }
}
 
export default connect()(Products);
