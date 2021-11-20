import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { getProductById } from '../services/api';

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      productName: '',
      img: '',
      priceProduct: 0,
      atributtesProduct: [],
    };
  }

  componentDidMount() {
    const { props: { match: { params: { id } } } } = this;
    this.getProduct(id);
  }

  getProduct = async (id) => {
    const response = await getProductById(id);
    console.log(response);
    this.setState(({
      productName: response.title,
      img: response.thumbnail,
      priceProduct: response.price,
      atributtesProduct: [...response.attributes],
    }));
  };

  render() {
    const { productName, img, priceProduct, atributtesProduct } = this.state;
    return (
      <div>
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
            <Button variant="primary">Adicionar ao carrinho</Button>
          </Card.Body>
        </Card>
      </div>
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
