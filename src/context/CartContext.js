import React, { createContext } from 'react';
import { observable, action, makeObservable } from 'mobx';

class CartStore {
  cartItems = [];
  totalValue = 0;

  constructor() {
    makeObservable(this, {
      cartItems: observable,
      totalValue: observable,
      addToCart: action,
      updateTotal: action,
    });
  }

  addToCart(product) {
    this.cartItems.push(product);
    this.updateTotal();
  }

  updateTotal() {
    this.totalValue = this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }
}

const cartStore = new CartStore();
export const CartContext = createContext(cartStore);

export class CartProvider extends React.Component {
  render() {
    return (
      <CartContext.Provider value={cartStore}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
