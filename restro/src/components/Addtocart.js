import "./addtocart.css";
import React from 'react'
import "./samp.css";
import {Link} from 'react-router-dom';

const Addtocart = (props) => {
    return (
      <div className='container cart-bar'>
        <div className='cost'>
          <h3>{props.quantity} Item | Rs {props.price}</h3>
          <h5>Extra charges may apply</h5>
        </div>
        <div className='view-cart'>
          <h3><Link to="/Cart">View Cart {'>'}</Link></h3>
        </div>
      </div>
    );
}

export default Addtocart;