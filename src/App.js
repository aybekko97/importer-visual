import React, { Component } from 'react';
import OrderList from './OrderList';
import UploadForm from './UploadForm';


class App extends Component {
  render() {
    return (
      <div className="container mt-3">
        <h2>Orders</h2>
        <OrderList />
        <br/>
        <UploadForm />
      </div>
    );
  }
}

export default App;
