import React, { useContext } from "react";
import cart from "../../../assets/cart.png";
import CartContext from "../../../contexts/Cart/CartContext";


const Product = ({ item, handleWatchProduct }) => {
  const { addCartItem, cartProducts, removeCartItem } = useContext(CartContext);
  const user = JSON.parse(localStorage.getItem("profile"));
  const isItemAdded = () => {
    return cartProducts.some((product) => product._id === item._id);
  };
  const added = isItemAdded();
  const handleCart = () => {
    if (!added) {
      addCartItem(user?.result?.userName, item);
    } else {
      removeCartItem(user?.result?.userName, item._id);
    }
  };
  return (
    <div className="col-md-4 my-3">
      <img
        onClick={() => handleWatchProduct(item._id)}
        className="w-100"
        style={{ borderRadius: "5%", cursor: "pointer" }}
        src={item.productImg}
        alt=""
      />
      <button
        onClick={handleCart}
        className={
          !added ? "btn btn-dark my-2 w-100" : "btn btn-danger my-2 w-100"
        }
      >
        {!added ? "Add to cart" : "Remove from cart"}

        <span style={{ marginLeft: 10 }}>
          <img style={{ width: "30px", height: "30px" }} src={cart} alt="" />
        </span>
      </button>
    </div>
  );
};

export default Product;
