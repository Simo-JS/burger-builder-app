import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";

//import Checkout from "./containers/Checkout/Checkout";
//import Orders from "./containers/Orders/Orders";
//import Auth from "./containers/Auth/Auth";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import * as actions from "./store/actions/index";

const asyncCheckout = asyncComponent(() =>
  import("./containers/Checkout/Checkout")
);
const asyncOrders = asyncComponent(() => import("./containers/Orders/Orders"));
const asyncAuth = asyncComponent(() => import("./containers/Auth/Auth"));

class App extends Component {
  componentDidMount() {
    this.props.onCheckAuthState();
  }

  render() {
    let routes;
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token != null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(actions.checkAuthState())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
