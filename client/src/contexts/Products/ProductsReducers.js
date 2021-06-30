import {
  GET_PRODUCT,
  GET_PRODUCTS,
  CLEAN_PRODUCT_STATE,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  GET_FULL_PRODUCT,
  GET_PURCHASES,
} from "../types";


// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [payload, ...state.products],
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === payload._id ? payload : product
        ),
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product._id !== payload),
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: payload,
      };
    case CLEAN_PRODUCT_STATE:
      return {
        ...state,
        products: [],
        product: null,
        fullProduct: null,
      };
    case GET_PURCHASES:
      return{
       ...state,
       purchases:payload
      }

    case GET_FULL_PRODUCT:
      return {
        ...state,
        fullProduct: payload,
      };

    default:
      return state;
  }
};
