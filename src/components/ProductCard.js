import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { PropTypes } from 'prop-types';

class ProductCard extends Component {
  constructor() {
    super();
    this.tryToGet = this.tryToGet.bind(this);
  }

  // recriando a funcao do shopping cart page para adicionar produtos
  tryToGet(productId) {
    const productsBought = localStorage.getItem(`${productId}`);
    // Aqui comecou a ficar repetitivo talvez?
    if (productsBought === null) {
      localStorage.setItem(`${productId}`, 1);
      console.log(localStorage.getItem(`${productId}`));
    } else {
      const actualQuantity = parseInt(localStorage.getItem(`${productId}`) ?? '0', 10);
      localStorage.setItem(`${productId}`, (actualQuantity + 1).toString());
      console.log(localStorage.getItem(`${productId}`));
    }
  }

  render() {
    const { product, price, img, productId } = this.props; // adicionando o productId pra poder usar a funcao com ele
    return (
      <Card style={ { width: '18rem' } } data-testid="product">
        <Card.Img variant="top" src={ img } />
        <Card.Body>
          <Card.Title>{ product }</Card.Title>
          <Card.Text>{ price }</Card.Text>
          <Button
            variant="primary"
            onClick={ () => this.tryToGet(productId) }
            data-testid="product-add-to-cart" // adicionando esse testid que faltava
          >
            Go somewhere
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  productId: PropTypes.number.isRequired,
};

export default ProductCard;
