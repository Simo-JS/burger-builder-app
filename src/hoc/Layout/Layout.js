import React, { Component } from "react";

import { connect } from "react-redux";

import Aux from "../Auxiliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

import classes from "./Layout.module.css";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return {
        showSideDrawer: !prevState.showSideDrawer
      };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          drawerToggleClicked={this.sideDrawerToggleHandler}
          isAuth={this.props.isAuth}
        />
        <SideDrawer
          show={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
          isAuth={this.props.isAuth}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
