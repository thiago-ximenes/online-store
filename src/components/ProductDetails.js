import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { PropTypes } from 'prop-types';

class ProductDetails extends Component {
  render() {
    const { product, price, img } = this.props;
    return (
      <div>
        <Card style={ { width: '18rem' } } data-testid="product">
          <Card.Img variant="top" src={ img } />
          <Card.Body>
            <Card.Title>{ product }</Card.Title>
            <Card.Text>{ price }</Card.Text>
            <Button variant="primary">Adicionar ao carrinho</Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default ProductDetails;

ProductDetails.propTypes = {
  product: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
};
