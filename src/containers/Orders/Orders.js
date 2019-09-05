import React, { Component } from "react";

import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then(response => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            id: key,
            ...response.data[key]
          });
        }
        this.setState({ orders: fetchedOrders, loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  render() {
    let orders = <Spinner />;
    if (!this.state.loading) {
      orders = (
        <div>
          {this.state.orders.map(order => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
            />
          ))}
        </div>
      );
    }
    return orders;
  }
}

export default withErrorHandler(Orders, axios);
