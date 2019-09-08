import * as actionTypes from "../actions/actionTypes";

const INGREDIENTS_PRICES = {
  meat: 1.3,
  bacon: 1.2,
  salad: 0.3,
  cheese: 0.5
};

const initialState = {
  ingredients: null,
  price: 0,
  error: false
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
    case actionTypes.INIT_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        price: 0
      };
    case actionTypes.INIT_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};

export default reducer;
