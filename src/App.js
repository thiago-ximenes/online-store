import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import ShoppingCartPage from './components/shopping-cart/ShoppingCartPage';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/shopping-cart" component={ ShoppingCartPage } />
        <Route exact path="/product-details/:id" component={ ProductDetails } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
