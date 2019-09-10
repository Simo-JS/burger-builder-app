import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

import classes from "./ContactData.module.css";

import axios from "../../../axios-orders";

import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

import * as actions from "../../../store/actions/index";

import { checkValidity } from "../../../shared/utility";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          name: "name",
          placeholder: "Your Name"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          name: "email",
          placeholder: "Your Email"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        value: ""
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          name: "street",
          placeholder: "Street"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        value: ""
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          name: "zipCode",
          placeholder: "ZIP Code"
        },
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false,
        value: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          name: "country",
          placeholder: "Country"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        value: ""
      },

      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        validation: {
          required: true
        },
        valid: true,
        touched: false,
        value: "fastest"
      }
    },
    formIsValid: false
  };

  orderHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let formElement in this.state.orderForm) {
      formData[formElement] = this.state.orderForm[formElement].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price.toFixed(2),
      orderData: formData,
      userId: this.props.userId
    };
    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangedHandler = (event, id) => {
    const orderFormUpdated = {
      ...this.state.orderForm
    };
    const formElementUpdated = {
      ...orderFormUpdated[id]
    };
    formElementUpdated.value = event.target.value;
    formElementUpdated.touched = true;
    formElementUpdated.valid = checkValidity(
      formElementUpdated.value,
      formElementUpdated.validation
    );
    orderFormUpdated[id] = formElementUpdated;
    let formIsValid = true;
    for (let id in orderFormUpdated) {
      formIsValid = orderFormUpdated[id].valid && formIsValid;
    }
    this.setState({ orderForm: orderFormUpdated, formIsValid: formIsValid });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button type="Success" disabled={!this.state.formIsValid}>
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Please enter your contact information</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.price,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.orderBurger(orderData, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
