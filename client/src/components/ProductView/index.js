import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import CartContext from "../../contexts/Cart/CartContext";

import ProductsContext from "../../contexts/Products/ProductsContext";

const Product = () => {
  const params = useParams();
  const user = JSON.parse(localStorage.getItem("profile"));
  const { productID } = params;
  const { product, getProduct, cleanProductState } =
    useContext(ProductsContext);

  const { addCartItem, cartProducts, removeCartItem } = useContext(CartContext);
  const isItemAdded = () => {
    return cartProducts.some((cartProduct) => cartProduct._id === product?._id);
  };

 
  const added = isItemAdded();

  const handleCart = () => {
    if (!added) {
      addCartItem(user?.result?.userName, product);
    } else {
      removeCartItem(user?.result?.userName, product._id);
    }
  };

  useEffect(() => {
    getProduct(productID);
    return () => {
      cleanProductState();
    };
  }, []);

  return (
    <div
      className="d-flex justify-content-center"
      style={{ height: "calc(100vh - 56px)", width: "100%" }}
    >
      <div style={{ maxWidth: 500 }}>
        <h3 className="text-light text-center">{product?.productName}</h3>
        <img
          style={{ borderRadius: "5%" }}
          className="w-100"
          src={product?.productImg}
          alt=""
        />
        <h3 className="text-light">Description:</h3>
        <p className="text-light text-justify">{product?.productDesc}</p>

        <button
          onClick={handleCart}
          className={
            !added ? "btn btn-dark my-2 w-100" : "btn btn-danger my-2 w-100"
          }
        >
          {!added ? "Add to cart" : "Remove from cart"}
        </button>
      </div>
    </div>
  );
};

export default Product;
