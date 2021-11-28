import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      localStorage.setItem('cartItems', `${productId}: 1`);
    } else {
      const actualQuantity = parseInt(localStorage.getItem(`${productId}`) ?? '0', 10);
      localStorage.setItem(`${productId}`, (actualQuantity + 1).toString());
    }
  }

  render() {
    const { product, price, img, productId } = this.props;
    // adicionando o productId pra poder usar a funcao com ele
    return (
      <Card style={ { width: '18rem' } } data-testid="product">
        <Card.Body>
          <Link
            to={ `/product-details/${productId}` }
            data-testid="product-detail-link"
          >
            <Card.Img variant="top" src={ img } />
            <Card.Title>{ product }</Card.Title>
            <Card.Text>{ price }</Card.Text>
          </Link>
          <Button
            variant="primary"
            onClick={ () => this.tryToGet(productId) }
            data-testid="product-add-to-cart" // adicionando esse testid que faltava
          >
            Adicionar ao carrinho
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
  productId: PropTypes.string.isRequired,
};

export default ProductCard;
