import React, { Component } from 'react';
import './App.css';
import NewCustomer from './Components/NewCustomer';
import EditCustomer from './Components/EditCustomer';
import Home from './Components/Home';
import {  BrowserRouter as Router ,  Route, Switch, Link } from 'react-router-dom';

class App extends React.Component{

  state = {
    customers : [],
    newCustomerModal : false
  }

  render() {
      return (
         <Router>
          <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/customer/new">
                <NewCustomer />
              </Route>
              <Route exact path="/customer/:id/edit" component={ EditCustomer }/>
          </Switch>
        </Router>
      );
  }
}

export default App;
