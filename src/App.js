import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import ShoppingCartPage from './components/shopping-cart/ShoppingCartPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/shopping-cart">
          <ShoppingCartPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
