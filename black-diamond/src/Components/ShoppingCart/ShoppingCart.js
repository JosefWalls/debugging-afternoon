import React, { Component } from "react";
import "./ShoppingCart.css";
import { timingSafeEqual } from "crypto";
import { createRequireFromPath } from "module";

class ShoppingCart extends Component {
  constructor(){
    super()
    
    this.state = {
      shipping: 0,
      tax: 0,  
      total: 0, // final display amount
      numberOfItems: 0, //number of items in cart
      itemPrices: 0 //all the prices added into one number
    }

    
  }
  componentDidMount() {
    //shipping
    let totalShip = (this.props.cart.length * 25)
    this.setState({numberOfItems: this.props.cart.length})
    this.setState({shipping: totalShip})
   //tax
    let taxes = [];
    for(let values in this.props.cart){                    //makes tax data
      taxes.push((this.props.cart[values].price * 1) * .425)
    }
    const taxSum = taxes.reduce(function(accumulator, current){   //adds up all the tax
     return accumulator + current
    })
    this.setState({tax: taxSum})

   //total
    let totalCost = [];
    for(let values in this.props.cart){                    //makes price data
      totalCost.push((this.props.cart[values].price * 1))
    }
    const totalCostSum = totalCost.reduce(function(accumulator, current){   //adds up all the element.prices
      return accumulator + current
     })
    this.setState({itemPrices: totalCostSum})
    
    let final = [totalShip +  taxSum + totalCostSum]          //adds up everything to
    console.log(final)
    this.setState({total: final})
  }

  render() {
    let shoppingCartDisplay = this.props.cart.map((element, index) => {
      return (
        <div className="shopping-cart-product-container" key={index}>
          <img src={element.image} alt="" />
          <div className="shopping-cart-info">
            <h2>{element.title}</h2>
            <h2>{"$" + element.price + ".00"}</h2>
            <h6>{"Tax is $" + (element.tax = element.price * .425) }</h6>
            <div className="shopping-cart-button-container">
              <button
                className="shopping-cart-button"
                onClick={() => this.props.removeFromCart(element)}
              >
                Remove From Shopping Cart
              </button>
            </div>
          </div>
        </div>
      );
    });
    
    return (
      <div className="shopping-cart-container">
        {shoppingCartDisplay[0] ? (
          shoppingCartDisplay
        ) : (
          <div className="go-buy-something">
            <h1>Your shopping cart is empty! Go buy something!</h1>
          </div>
        )}
        <div className="totals">
        <p>Shipping: $25.00 on {this.state.numberOfItems} items is {"$" + this.state.shipping}</p>
        <p>Tax: 45.2% on {this.state.numberOfItems} item is ${this.state.tax}</p>
        <p>Total: {"$" + this.state.total}</p>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
