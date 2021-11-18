import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import ShoppingCartButton from './shopping-cart/ShoppingCartButton';

class Home extends Component {
  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Label
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <ShoppingCartButton />
      </Form>
    );
  }
}

export default Home;
