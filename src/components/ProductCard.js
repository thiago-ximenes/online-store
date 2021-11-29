import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { tryToGet } from '../services/localStorage';

class ProductCard extends Component {
  // recriando a funcao do shopping cart page para adicionar produtos
  render() {
    const { productName, price, img, product } = this.props;
    // adicionando o productId pra poder usar a funcao com ele
    return (
      <Card style={ { width: '18rem' } } data-testid="product">
        <Card.Body>
          <Link
            to={ `/product-details/${product.id}` }
            data-testid="product-detail-link"
          >
            <Card.Img variant="top" src={ img } />
            <Card.Title>{ productName }</Card.Title>
            <Card.Text>{ price }</Card.Text>
          </Link>
          <Button
            variant="primary"
            onClick={ () => tryToGet(product) }
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
  productName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  product: PropTypes.shape({ id: PropTypes.string }).isRequired,
};

export default ProductCard;
