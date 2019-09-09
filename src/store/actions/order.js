import * as actionTypes from "./actionTypes";

import axios from "../../axios-orders";

const orderBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.ORDER_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

const orderBurgerFail = error => {
  return {
    type: actionTypes.ORDER_BURGER_FAIL,
    error: error
  };
};

export const orderBurgerStart = () => {
  return {
    type: actionTypes.ORDER_BURGER_START
  };
};

export const orderBurger = orderData => {
  return dispatch => {
    dispatch(orderBurgerStart());
    axios
      .post("/orders.json", orderData)
      .then(response => {
        dispatch(orderBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        console.log(error);
        dispatch(orderBurgerFail(error));
      });
  };
};

export const orderInit = () => {
  return {
    type: actionTypes.ORDER_INIT
  };
};
