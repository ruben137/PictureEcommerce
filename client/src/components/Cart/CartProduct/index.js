import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CartContext from "../../../contexts/Cart/CartContext";
const CartProduct = (product ) => {
  const history = useHistory();
  const { removeCartItem,checkIfAvailable } = useContext(CartContext);
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    checkIfAvailable(user?.result?.userName,product._id);
  }, [checkIfAvailable,user?.result?.userName,product._id]);
  return (
    <tr>
      <td style={{ width: "200px" }}>
        <img
          style={{ cursor: "pointer" }}
          onClick={() => history.push(`/product/${product?._id}`)}
          className="w-100"
          src={product?.productImg}
          alt={product?.productName}
        />
      </td>
      <td>{product?.productPrice}$</td>

      <td>
        <button
          onClick={() => removeCartItem(user?.result?.userName, product?._id)}
          className="btn btn-danger"
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default CartProduct;
