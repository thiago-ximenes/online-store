import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getCategories } from '../services/api';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      categoria: [],
    };
  }

  componentDidMount() {
    this.handlelist();
  }

  async handlelist() {
    const response = await getCategories();
    this.setState(({
      categoria: response,
    }));
  }

  render() {
    const { categoria } = this.state;
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
        <div>
          {categoria.map((value) => (
            <Button
              variant="link"
              key={ value.id }
              data-testid="category"
            >
              {value.name}
            </Button>
          ))}
        </div>
      </Form>
    );
  }
}

export default Home;
