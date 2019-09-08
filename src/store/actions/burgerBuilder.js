import * as actionTypes from "./actionTypes";

import axios from "../../axios-orders";

export const addIngredient = ingredientName => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingredientName
  };
};

export const removeIngredient = ingredientName => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingredientName
  };
};

export const initIngredientsSync = ingredients => {
  return {
    type: actionTypes.INIT_INGREDIENTS,
    ingredients: ingredients
  };
};

export const initIngredientsFailed = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios
      .get("https://myburger-builder-app.firebaseio.com/ingredients.json")
      .then(response => dispatch(initIngredientsSync(response.data)))
      .catch(error => dispatch(initIngredientsFailed()));
  };
};
