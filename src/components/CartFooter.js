import React, { Component } from 'react';
import { CartContext } from '../context/CartContext';
import { observer } from 'mobx-react';

class CartFooter extends Component {
  static contextType = CartContext;
  render() {
    const { cartItems, totalValue } = this.context;
    return (
      <footer style={{ padding: 16, background: '#eee', textAlign: 'center' }}>
        <span>Cart Items: {cartItems.length} | Total: ${totalValue.toFixed(2)}</span>
      </footer>
    );
  }
}

export default observer(CartFooter);
