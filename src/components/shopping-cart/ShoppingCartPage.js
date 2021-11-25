import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { getProductById } from '../../services/api';
import Loading from '../Loading';

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
    this.setState({ loading: true },
      () => {
        // pegar todas as keys
        const keys = Object.keys(localStorage);
        const objectArray = [];
        keys.map(async (product) => {
          const response = await getProductById(product); // aqui tem o id, title, etc, lint reclamou disso, https://eslint.org/docs/rules/no-await-in-loop#when-not-to-use-it, nao entendi como resolver
          const value = localStorage.getItem(`${product}`); // aqui tem a quantidade
          const tmprObj = {
            price: response.price,
            id: response.id,
            img: response.thumbnail,
            name: response.title,
            quantity: parseInt(value, 10),
          };
          objectArray.push(tmprObj);
          this.setState({
            allItems: objectArray,
          });
          this.sumTotal();
        });
      });
    this.setState({ loading: false });
  }

  handleClick = async (index, operation, productId) => {
    const { allItems } = this.state;
    if (operation === 'remove') {
      localStorage.removeItem(productId.toString());
      await this.getItemsInCart();
      if (allItems.length === 1) {
        this.setState({ allItems: [] });
        this.sumTotal();
      }
    }
    if (operation === true) {
      const actualQuantity = parseInt(localStorage.getItem(`${productId}`) ?? '0', 10);
      localStorage.setItem(`${productId}`, (actualQuantity + 1).toString());
      allItems[index].quantity = localStorage.getItem(`${productId}`);
      this.setState({
        allItems,
      });
      this.sumTotal();
    } else if (allItems[index].quantity > 0 && operation !== 'remove') {
      const actualQuantity = parseInt(localStorage.getItem(`${productId}`) ?? '0', 10);
      localStorage.setItem(`${productId}`, (actualQuantity - 1).toString());
      allItems[index].quantity = localStorage.getItem(`${productId}`);
      this.setState({
        allItems,
      });
      this.sumTotal();
    }
  }

  sumTotal = () => {
    const { allItems } = this.state;
    let sum = 0;
    allItems.forEach((product) => {
      sum += product.price * product.quantity;
    });
    return this.setState({ totalPrice: sum });
  }

  render() {
    const { allItems, totalPrice, loading } = this.state;
    const { handleClick } = this;
    return (
      loading ? (<Loading />)
        : (
          <div>
            <ul>
              {allItems.length === 0
                ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
                : (
                  allItems.map((product, index) => (
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
                        { product.price.toFixed(2) }
                      </p>
                      <Button
                        data-testid="product-increase-quantity"
                        onClick={ () => handleClick(index, true, product.id) }
                      >
                        +
                      </Button>
                      <Button
                        data-testid="product-decrease-quantity"
                        onClick={ () => handleClick(index, false, product.id) }
                      >
                        -
                      </Button>
                      <Button
                        onClick={ () => handleClick(index, 'remove', product.id) }
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
