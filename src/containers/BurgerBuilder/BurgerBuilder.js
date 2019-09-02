import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";

import Aux from "../../hoc/Auxiliary";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import axios from "../../axios-orders";

const INGREDIENTS_PRICES = {
  meat: 1.3,
  bacon: 1.2,
  salad: 0.3,
  cheese: 0.5
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      meat: 0,
      bacon: 0,
      salad: 0,
      cheese: 0
    },
    price: 0,
    purshaseable: false,
    purchasing: false,
    loading: false
  };

  addIngredientHandler = type => {
    let newIngredients = { ...this.state.ingredients };
    let newPrice = this.state.price + INGREDIENTS_PRICES[type];
    let ingCount = newIngredients[type];
    newIngredients[type] = ingCount + 1;
    this.setState({ ingredients: newIngredients, price: newPrice });
    this.updatePurshaseState(newIngredients);
  };

  removeIngredientHandler = type => {
    let newIngredients = { ...this.state.ingredients };
    let ingCount = newIngredients[type];
    if (ingCount <= 0) return;
    let newPrice = this.state.price - INGREDIENTS_PRICES[type];
    newIngredients[type] = ingCount - 1;
    this.setState({ ingredients: newIngredients, price: newPrice });
    this.updatePurshaseState(newIngredients);
  };

  updatePurshaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);
    this.setState({ purshaseable: sum > 0 });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  cancelPurchasingHandler = () => {
    this.setState({ purchasing: false });
  };

  continuePurchasingHandler = () => {
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.price.toFixed(2),
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
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
        console.log("[ERROR]: ", error);
      });
  };

  render() {
    let disabledInfo = { ...this.state.ingredients };
    for (let k in disabledInfo) {
      disabledInfo[k] = disabledInfo[k] <= 0;
    }
    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.price}
        purchaseCancelled={this.cancelPurchasingHandler}
        purchaseContinued={this.continuePurchasingHandler}
      />
    );
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.cancelPurchasingHandler}
        >
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.price}
          purshaseable={this.state.purshaseable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
