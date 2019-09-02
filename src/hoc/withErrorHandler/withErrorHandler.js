import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    confirmErrorHandler = () => {
      this.setState({ error: null });
    };

    render() {
      axios.interceptors.response.use(
        response => response,
        error => {
          this.setState({ error: error });
        }
      );
      axios.interceptors.request.use(request => {
        this.setState({ error: null });
        return request;
      });
      return (
        <Aux>
          <Modal show={this.state.error} modalClosed={this.confirmErrorHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
