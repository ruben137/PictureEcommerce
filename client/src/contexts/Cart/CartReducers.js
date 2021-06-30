import {
  ADD_CART_PRODUCT,
  GET_CART_PRODUCTS,
  REMOVE_CART_ITEM,
  REMOVE_ITEM_FROM_STORAGE,
  CLEAN_CART_STATE
} from "../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_CART_PRODUCTS:
      return {
        ...state,
        cartProducts: payload,
      };
    case ADD_CART_PRODUCT:
      return {
        ...state,
        cartProducts: [...state.cartProducts, payload],
      };

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartProducts: state.cartProducts.filter(
          (product) => product._id !== payload
        ),
      };
    case REMOVE_ITEM_FROM_STORAGE:
      localStorage.removeItem("products");
      return state;
    case CLEAN_CART_STATE:
      return {...state,cartProducts:payload}

    default:
      return state;
  }
};
