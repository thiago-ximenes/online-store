import React, { Component } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { getProductById } from '../services/api';
import ShoppingCartButton from './shopping-cart/ShoppingCartButton';

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      productName: '',
      img: '',
      priceProduct: 0,
      atributtesProduct: [],
      productId: '',
      productQuantity: 0,
      input: '',
    };
    this.tryToGet = this.tryToGet.bind(this);
  }

  componentDidMount() {
    const { props: { match: { params: { id } } } } = this;
    this.getProduct(id);
    this.getQuantity(id);
  }

  getProduct = async (id) => {
    const response = await getProductById(id);
    console.log(response);
    this.setState(({
      productName: response.title,
      img: response.thumbnail,
      priceProduct: response.price,
      atributtesProduct: [...response.attributes],
      productId: response.id,
    }));
  };

  // pegar a quantidade quando inicia a página
  getQuantity(id) {
    this.setState({
      productId: id,
    });
    const productsBought = localStorage.getItem(`${id}`);
    if (productsBought === null) {
      this.setState({
        productQuantity: 0,
      });
    } else {
      this.setState({
        productQuantity: productsBought,
      });
    }
  }

  handleInputClick = ({ target: { value } }) => {
    this.setState({ input: value });
  }

  // quando carregar tentar pegar uma key igual ao productId // localstorage getItem
  tryToGet(productId) {
    this.setState({
      productId,
    });
    const productsBought = localStorage.getItem(`${productId}`);
    if (productsBought === null) {
      localStorage.setItem(`${productId}`, 1);
      console.log(localStorage.getItem(`${productId}`));
      this.setState({
        productQuantity: localStorage.getItem(`${productId}`),
      });
    } else {
      const actualQuantity = parseInt(localStorage.getItem(`${productId}`) ?? '0', 10);
      localStorage.setItem(`${productId}`, (actualQuantity + 1).toString());
      console.log(localStorage.getItem(`${productId}`));
      this.setState({
        productQuantity: localStorage.getItem(`${productId}`),
      });
    }
  }

  render() {
    const {
      productName,
      img,
      priceProduct,
      atributtesProduct,
      productId,
      productQuantity,
      input,
    } = this.state;
    const { handleInputClick } = this;
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
              { priceProduct }
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
              onClick={ () => this.tryToGet(productId) }
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
        <p>{ productQuantity }</p>
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
