import React, { Component } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { getProductById } from '../services/api';
import ShoppingCartButton from './shopping-cart/ShoppingCartButton';
import { tryToGet, getFromLocalStorage } from '../services/localStorage';

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      productName: '',
      img: '',
      priceProduct: 0,
      atributtesProduct: [],
      product: '',
      productQuantity: 0,
      input: '',
    };
  }

  componentDidMount() {
    const { props: { match: { params: { id } } } } = this;
    this.getProduct(id);
    this.getQuantity(id);
  }

  getProduct = async (id) => {
    const response = await getProductById(id);
    this.setState(({
      productName: response.title,
      img: response.thumbnail,
      priceProduct: response.price,
      atributtesProduct: [...response.attributes],
      product: response,
    }));
  };

  // pegar a quantidade quando inicia a página
  getQuantity(id) {
    let productsBought;
    if (getFromLocalStorage()) {
      productsBought = JSON.parse(getFromLocalStorage())
        .find((product) => product.id === id);
    }
    if (!productsBought) {
      this.setState({
        productQuantity: 0,
      });
    } else {
      console.log(productsBought);
      this.setState({
        productQuantity: productsBought.quantity,
      });
    }
  }

  handleInputClick = ({ target: { value } }) => {
    this.setState({ input: value });
  }

  fromLocalStorageToState = (productId) => {
    tryToGet(productId);
  }

  render() {
    const {
      productName,
      img,
      priceProduct,
      atributtesProduct,
      product,
      productQuantity,
      input,
    } = this.state;
    const { handleInputClick, fromLocalStorageToState } = this;
    return (
      <div>
        <ShoppingCartButton data-testid="shopping-cart-button" />
        <Card style={ { width: '18rem' } } data-testid="product">
          <Card.Body>
            <p data-testid="product-detail-name">{ productName }</p>
            <img src={ img } alt={ productName } />
            <p>
              R$
              {' '}
              { priceProduct.toFixed(2) }
            </p>
            {atributtesProduct.map((value) => (
              <div key={ value.id }>
                <p>
                  {value.name}
                  :
                  {' '}
                  {value.value_name}
                </p>
              </div>
            ))}
            <Button
              variant="primary"
              data-testid="product-detail-add-to-cart"
              onClick={ () => fromLocalStorageToState(product) }
            >
              Adicionar ao carrinho
            </Button>
            <Form.Control
              as="textarea"
              value={ input }
              onChange={ handleInputClick }
              data-testid="product-detail-evaluation"
            />
          </Card.Body>
        </Card>
        <p>
          Quantidade:
          {' '}
          { productQuantity }
        </p>
      </div> // adicionando esse p de cima só pra mostrar a quantidade na hora
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetails;
