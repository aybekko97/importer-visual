import React, { Component } from 'react';

const url = "http://localhost:5000/"

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

   componentDidMount() {
     fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.orders
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
   }

  render() {
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div className="alert alert-danger" role="alert">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="alert alert-primary" role="alert">Loading...</div>;
    } else {

      return (
        <table className="table">
          <thead  className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Mail ID</th>
              <th scope="col">Full name</th>
              <th scope="col">Index</th>
              <th scope="col">Weight</th>
              <th scope="col">Cost</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, i) => (
              <tr key={item.mail_id}>
                <th scope="row">{i}</th>
                <td>{item.mail_id}</td>
                <td>{item.fullname}</td>
                <td>{item.index}</td>
                <td>{item.weight}</td>
                <td>{item.cost}</td>
             </tr>
            ))}
          </tbody>
        </table>
      );
    }
  }
}

export default OrderList;
