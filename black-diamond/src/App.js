import React, { Component } from "react";
import axios from "axios";
import StoreFront from "./Components/StoreFront/StoreFront";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import NavBar from "./Components/NavBar/NavBar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: [],
      showCart: false
    };

  }
  componentDidMount() {
    axios
      .get("https://practiceapi.devmountain.com/products/")
      .then(response => {
        this.setState({
          products: response.data
        });
      });
  }
  addToCart = (item) => {
    this.setState({
      cart: [...this.state.cart, item]
    });
  }
  removeFromCart = (index) => {
    let cartCopy = this.state.cart.slice(); ////////////////////////////////////THIS MAY BE THE ISSUE
    cartCopy.splice(index, 1);
    this.setState({
      cart: cartCopy
    });
    alert("Item sadly removed. But we still gon charge you.")
  }
  
  navigate = (location) => {
    if (location === "this.state.cart") {
      this.setState({showCart: true})
    } else {
      this.setState({showCart: false})
    }
  }

  render() {
    const { products, cart, showCart } = this.state;
    return (
      <div className="App">
        <NavBar navigate={this.navigate} />
        <div className="main-container">
          {showCart ? (
            <ShoppingCart cart={cart} removeFromCart={this.removeFromCart} />
          ) : (
            <StoreFront products={products} addToCart={this.addToCart} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
