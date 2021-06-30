import React, { useReducer } from "react";
import CartContext from "./CartContext";
import CartReducer from "./CartReducers";
import * as api from "../api";
import {
  ADD_CART_PRODUCT,
  GET_CART_PRODUCTS,
  REMOVE_CART_ITEM,
  REMOVE_ITEM_FROM_STORAGE,
  CLEAN_CART_STATE,
} from "../types";

export const CartState = (props) => {
  const initialState = {
    cartProducts: [],
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);

  const getCartItems = async (user) => {
    try {
      if (user) {
        const cartData = JSON.parse(localStorage.getItem("products"));
        if (cartData) {
          const { data } = await api.addPrevICartItems(user, {
            products: cartData.products,
          });

          dispatch({ type: GET_CART_PRODUCTS, payload: data });
          dispatch({ type: REMOVE_ITEM_FROM_STORAGE });
          return;
        }
        const { data } = await api.fetchCartProducts(user);
        dispatch({ type: GET_CART_PRODUCTS, payload: data, remove: false });
      } else {
        const data = JSON.parse(localStorage.getItem("products"));

        dispatch({ type: GET_CART_PRODUCTS, payload: data?.products || [] });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addCartItem = async (user, product) => {
    try {
      if (user) {
        const { data } = await api.addCartProduct(user, product);
        dispatch({ type: ADD_CART_PRODUCT, payload: data });
      } else {
        const data = JSON.parse(localStorage.getItem("products"));

        if (!data?.products) {
          localStorage.setItem(
            "products",
            JSON.stringify({ products: [product] })
          );
          dispatch({ type: ADD_CART_PRODUCT, payload: product });
          return;
        }
        localStorage.setItem(
          "products",
          JSON.stringify({ products: [...data.products, product] })
        );
        dispatch({ type: ADD_CART_PRODUCT, payload: product });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = async (user, id) => {
    try {
      if (user) {
        const { data } = await api.removeCartProduct(user, id);
        dispatch({ type: REMOVE_CART_ITEM, payload: data });
      } else {
        const { products } = JSON.parse(localStorage.getItem("products"));
        const data = products.filter((product) => product._id !== id);
        localStorage.setItem("products", JSON.stringify({ products: data }));
        dispatch({ type: REMOVE_CART_ITEM, payload: id });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearCart = async () => {
    try {
      const { data } = await api.clearCart();
      dispatch({ type: CLEAN_CART_STATE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const removeItemsFromStorage = () => {
    try {
      dispatch({ type: REMOVE_ITEM_FROM_STORAGE });
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfAvailable = async (user, id) => {
    try {
      const { data } = await api.checkIfAvailable(id);

      if (!data) {
        await api.removeCartProduct(user, id);
        dispatch({ type: REMOVE_CART_ITEM, payload: id });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const cleanCartState = () => {
    try {
      dispatch({ type: CLEAN_CART_STATE, payload: [] });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts: state.cartProducts,
        checkIfAvailable,
        getCartItems,
        addCartItem,
        removeCartItem,
        removeItemsFromStorage,
        clearCart,
        cleanCartState,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
