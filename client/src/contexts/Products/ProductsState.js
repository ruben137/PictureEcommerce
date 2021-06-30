import React, { useReducer } from "react";
import {
  GET_PRODUCTS,
  GET_PRODUCT,
  CLEAN_PRODUCT_STATE,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  GET_FULL_PRODUCT,
  GET_PURCHASES,
} from "../types";
import ProductsContext from "./ProductsContext";
import ProductsReducer from "./ProductsReducers";
import * as api from "../api";

const ProductsState = (props) => {
  const initialState = {
    products: [],
    product: null,
    fullProduct: null,

    purchases: [],
  };

  const [state, dispatch] = useReducer(ProductsReducer, initialState);



  const getProduct = async (id, setProduct) => {
    try {
      if (typeof setProduct === "function") {
        const product = await api.fetchProduct(id);
        const fullProduct = await api.fetchFullProduct(id);
        setProduct({ ...product.data, productImgFull: fullProduct.data });

        return;
      }
      const { data } = await api.fetchProduct(id);
      dispatch({ type: GET_PRODUCT, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const getFullProduct = async (id) => {
    try {
      const { data } = await api.fetchFullProduct(id);

      dispatch({ type: GET_FULL_PRODUCT, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const createProduct = async (product) => {
    try {
      const { data } = await api.addProduct(product);
      dispatch({ type: ADD_PRODUCT, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const { data } = await api.deleteProduct(id);
      dispatch({ type: DELETE_PRODUCT, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (product) => {
    try {
      const { data } = await api.updateProduct(product);
      dispatch({ type: UPDATE_PRODUCT, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const buyProducts = async (user, products, history) => {
    try {
      await api.buyProducts(user, products);
      history.push("/purchases");
    } catch (error) {
      console.log(error);
    }
  };

  const getProductsAdmin = async () => {
    try {
      const { data } = await api.fetchAdminProducts();
      dispatch({ type: GET_PRODUCTS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const getPurchases = async () => {
    try {
      const { data } = await api.fetchPurchases();

      dispatch({ type: GET_PURCHASES, payload: data });
    } catch (error) {
      console.log(error.response);
    }
  };

  const getPurchasedPic = async (token, setPic) => {
    try {
      const { data } = await api.fetchPurchasedPic(token);
      setPic(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const cleanProductState = () => {
    try {
      dispatch({ type: CLEAN_PRODUCT_STATE });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products: state.products,
        product: state.product,
        purchases: state.purchases,
        fullProduct: state.fullProduct,
        getPurchases,
        buyProducts,
     
        getProductsAdmin,
        getProduct,
        getFullProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        getPurchasedPic,
        cleanProductState,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsState;
