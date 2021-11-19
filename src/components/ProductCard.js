import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { PropTypes } from 'prop-types';

class ProductCard extends Component {
  render() {
    const { product, price, img } = this.props;
    return (
      <Card style={ { width: '18rem' } } data-testid="product">
        <Card.Img variant="top" src={ img } />
        <Card.Body>
          <Card.Title>{ product }</Card.Title>
          <Card.Text>{ price }</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
};

export default ProductCard;
