import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import ProductCard from './ProductCard';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      category: [],
      input: '',
      listProducts: [],
      status: false,
    };
  }

  componentDidMount() {
    this.handlelist();
  }

  async handlelist() {
    const response = await getCategories();
    this.setState(({
      category: response,
    }));
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState(({
      input: value,
    }));
  }

  handleClick = async () => {
    const { input } = this.state;
    const response = await getProductsFromCategoryAndQuery(null, input);
    this.setState(({
      listProducts: response.results,
      status: response.results.length === 0,
    }));
  }

  render() {
    const { category, input, listProducts, status } = this.state;
    const { handleChange, handleClick } = this;
    return (
      <>
        <Form>
          <Form.Group>
            <Form.Label
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </Form.Label>
            <Form.Control
              type="text"
              onChange={ handleChange }
              value={ input }
              data-testid="query-input"
            />
          </Form.Group>
          <Button
            data-testid="query-button"
            onClick={ handleClick }
          >
            Buscar
          </Button>
        </Form>
        <div>
          {category.map((value) => (
            <Button
              variant="link"
              key={ value.id }
              data-testid="category"
            >
              {value.name}
            </Button>
          ))}
        </div>
        <div>
          { status ? (<span> Nenhum produto foi encontrado</span>) : (
            listProducts.map((product) => (
              <ProductCard
                key={ product.id }
                product={ product.title }
                price={ product.price }
                img={ product.thumbnail }
              />
            )))}
        </div>
      </>
    );
  }
}

export default Home;
