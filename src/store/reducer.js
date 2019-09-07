import * as actionTypes from "./actions";

const INGREDIENTS_PRICES = {
  meat: 1.3,
  bacon: 1.2,
  salad: 0.3,
  cheese: 0.5
};

const initialState = {
  ingredients: {
    meat: 0,
    bacon: 0,
    salad: 0,
    cheese: 0
  },
  price: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        price: state.price + INGREDIENTS_PRICES[action.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        price: state.price - INGREDIENTS_PRICES[action.ingredientName]
      };
    default:
      return state;
  }
};

export default reducer;
