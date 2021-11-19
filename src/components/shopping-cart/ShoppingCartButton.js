import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class ShoppingCartButton extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
  }

  handleClick = (event) => {
    event.preventDefault();
    return (
      this.setState({
        redirect: true,
      })
    );
  }

  render() {
    const { handleClick } = this;
    const { redirect } = this.state;
    return (
      <>
        <Button
          onClick={ handleClick }
          type="submit"
          data-testid="shopping-cart-button"
        >
          shopping cart
        </Button>
        {
          redirect && <Redirect
            to={ {
              pathname: '/shopping-cart',
            } }
          />
        }
      </>
    );
  }
}

export default ShoppingCartButton;
