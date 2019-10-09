import React, { Component } from "react";
import axios from 'axios'
import "./StoreFront.css";

class StoreFront extends Component {
  render() {
    let productDisplay = this.props.products.map((element, index) => {
      return (<div className="product-container" key={index}>
        <h2>{element.title}</h2>
        <img src={element.image} alt="" />
        <h2>{element.desc}</h2>
        <h3>{"$" + element.price + ".00"}</h3>
        <h6>{"Tax is $" + (element.tax = element.price * .425) }</h6>
        <button onClick={() => this.props.addToCart(element)}>Purchase!</button>
      </div>);
    });
    return <div className="storefront-container">{productDisplay}</div>;
  }
}

export default StoreFront;
