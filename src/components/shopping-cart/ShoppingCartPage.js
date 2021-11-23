import React, { Component } from 'react';
import { getProductById } from '../../services/api';

class ShoppingCartPage extends Component {
  constructor() {
    super();
    this.state = {
      allItems: [],
    };
  }

  componentDidMount() {
    this.getItemsInCart();
  }

  // setar funcao pra procurar itens no localstorage
  async getItemsInCart() {
    // pegar todas as keys
    const keys = Object.keys(localStorage);
    const objectArray = [];
    keys.map(async (produt) => {
      const response = await getProductById(produt); // aqui tem o id, title, etc, lint reclamou disso, https://eslint.org/docs/rules/no-await-in-loop#when-not-to-use-it, nao entendi como resolver
      const value = localStorage.getItem(`${produt}`); // aqui tem a quantidade
      const tmprObj = {
        name: response.title,
        quantity: value,
      };
      objectArray.push(tmprObj);
      this.setState({
        allItems: objectArray,
      });
    });
  }

  render() {
    const { allItems } = this.state;
    return (
      <div>
        <ul>
          {allItems.length === 0
            ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            : (
              allItems.map((product) => (
                <li key={ product.id }>
                  <p data-testid="shopping-cart-product-name">
                    { product.name }
                  </p>
                  <p data-testid="shopping-cart-product-quantity">{ product.quantity }</p>
                </li>
              ))
            )}
        </ul>
      </div>
    );
  }
}

export default ShoppingCartPage;
