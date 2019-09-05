import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";

import classes from "./ContactData.module.css";

import axios from "../../../axios-orders";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price.toFixed(2),
      customer: {
        name: "Simo JS",
        address: {
          country: "Morocco",
          street: "Test Street 1",
          zipCode: "12345"
        },
        email: "test@test.com"
      },
      deliveryMethod: "Fastest"
    };
    axios
      .post("orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log("[ERROR]: ", error);
      });
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Your Email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postal"
          placeholder="Postal Code"
        />
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Please enter your contact information</h4>
        {form}
        <Button type="Success" clicked={this.orderHandler}>
          Order
        </Button>
      </div>
    );
  }
}

export default ContactData;
