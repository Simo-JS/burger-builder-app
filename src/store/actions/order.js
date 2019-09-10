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

export const orderBurger = (orderData, token) => {
  return dispatch => {
    dispatch(orderBurgerStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
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

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("/orders.json" + queryParams)
      .then(response => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            id: key,
            ...response.data[key]
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(error => {
        console.log(error.response.data.error);
        dispatch(fetchOrdersFail(error));
      });
  };
};
