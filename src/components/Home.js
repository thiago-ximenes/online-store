import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import ProductCard from './ProductCard';
import ShoppingCartButton from './shopping-cart/ShoppingCartButton';

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

  handleClick = async (category = null, btnInput) => {
    const { input } = this.state;
    if (input !== '' && btnInput !== null) {
      btnInput = input;
    }
    const response = await getProductsFromCategoryAndQuery(category, btnInput);
    this.setState(({
      listProducts: response.results,
      status: response.results.length === 0,
      input: '',
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
              placeholder="Pesquise um produto ..."
            />
          </Form.Group>
          <Button
            data-testid="query-button"
            onClick={ handleClick }
          >
            Buscar
          </Button>
          <ShoppingCartButton />
        </Form>
        <div>
          {category.map((value) => (
            <Button
              variant="link"
              key={ value.id }
              data-testid="category"
              onClick={ () => handleClick(value.id, null) }
            >
              {value.name}
            </Button>
          ))}
        </div>
        { status ? (<span> Nenhum produto foi encontrado</span>) : (
          listProducts.map((product) => (
            <div key={ product.id }>
              <ProductCard
                productName={ product.title }
                price={ product.price }
                img={ product.thumbnail }
                product={ product } // adicionando esse novo pro product card receber
              />
            </div>
          )))}
      </>
    );
  }
}

export default Home;
