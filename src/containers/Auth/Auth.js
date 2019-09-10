import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

import classes from "./Auth.module.css";

import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

import { checkValidity } from "../../shared/utility";

class Auth extends Component {
  componentDidMount = () => {
    if (!this.props.building && this.props.authRedirectPath !== "/")
      this.props.onSetAuthRedirectPath("/");
  };
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          name: "email",
          placeholder: "Email"
        },
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false,
        value: ""
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          name: "password",
          placeholder: "Password"
        },
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false,
        value: ""
      }
    },
    isSignup: true
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  };

  authHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignup: !prevState.isSignup
      };
    });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = (
      <form onSubmit={this.authHandler}>
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
        <Button type="Success">
          {this.state.isSignup ? "SIGN UP" : "SIGN IN"}
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    let errorMsg = null;
    if (this.props.error) {
      errorMsg = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuth) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMsg}
        {form}
        <Button type="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {!this.state.isSignup ? "SIGN UP" : "SIGN IN"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
