import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
// import { getProductById } from '../../services/api';
import Loading from '../Loading';
import { getFromLocalStorage, saveToLocalStorage } from '../../services/localStorage';

class ShoppingCartPage extends Component {
  constructor() {
    super();
    this.state = {
      allItems: [],
      totalPrice: 0,
      loading: false,
    };
  }

  componentDidMount() {
    this.getItemsInCart();
  }

  // setar funcao pra procurar itens no localstorage
  async getItemsInCart() {
    // pegar todas as keys
    const storage = JSON.parse(getFromLocalStorage());
    let total = 0;
    if (storage) total = this.sumTotal(storage);
    this.setState({
      allItems: storage,
    },
    this.setState({ totalPrice: total }));
  }

  handleClick = async (operation, product) => {
    const { allItems } = this.state;
    const productClicked = allItems.find((item) => item.id === product.id);
    if (operation === 'remove') {
      localStorage.removeItem(product.id.toString());
      await this.getItemsInCart();
      if (allItems.length === 1) {
        this.setState({ allItems: [] });
      }
    }
    if (operation === true) {
      productClicked.quantity += 1;
    } else if (productClicked.quantity > 1) {
      productClicked.quantity -= 1;
    }
    this.setState({ allItems });
    saveToLocalStorage(JSON.stringify(allItems));
  }

  sumTotal = (productList) => {
    let sum = 0;
    productList.forEach((product) => {
      sum += product.price * product.quantity;
    });
    return sum;
  }

  render() {
    const { allItems, totalPrice, loading } = this.state;
    const { handleClick } = this;
    return (
      loading ? (<Loading />)
        : (
          <div>
            <ul>
              {!allItems
                ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
                : (
                  allItems.map((product) => (
                    <li key={ product.id }>
                      <p data-testid="shopping-cart-product-name">
                        { product.name }
                      </p>
                      <img src={ product.img } alt={ product.name } />
                      <p
                        data-testid="shopping-cart-product-quantity"
                      >
                        Quantidade:
                        {' '}
                        { product.quantity }
                      </p>
                      <p>
                        Preço: R$
                        {' '}
                        { product.price }
                      </p>
                      <Button
                        data-testid="product-increase-quantity"
                        onClick={ () => handleClick(true, product) }
                      >
                        +
                      </Button>
                      <Button
                        data-testid="product-decrease-quantity"
                        onClick={ () => handleClick(false, product) }
                      >
                        -
                      </Button>
                      <Button
                        onClick={ () => handleClick('remove', product) }
                      >
                        X
                      </Button>
                    </li>
                  ))
                )}
              <p />
              <p>
                { `Total: R$ ${totalPrice.toFixed(2)} `}
              </p>
            </ul>
          </div>
        )
    );
  }
}

export default ShoppingCartPage;
