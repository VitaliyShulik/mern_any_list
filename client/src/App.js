import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import AnyList from './components/AnyList';
import AddItemModal from './components/item/AddItemModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return ( 
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <AddItemModal />
            <AnyList />
          </Container>
        </div>
      </Provider>
    );
  };
};

export default App;
