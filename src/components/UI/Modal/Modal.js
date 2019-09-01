import React, { Component } from "react";

import Aux from "../../../hoc/Auxiliary";
import Backdrop from "../../UI/Backdrop/Backdrop";

import classes from "./Modal.module.css";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.show !== nextProps.show;
  }

  render() {
    return (
      <Aux>
        <Backdrop
          show={this.props.show}
          clicked={this.props.modalClosed}
        ></Backdrop>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translate(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
