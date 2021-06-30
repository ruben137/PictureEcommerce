import React, { useContext } from "react";
import CartContext from "../../contexts/Cart/CartContext";
import { useHistory } from "react-router";
import PaymentContext from "../../contexts/Payment/PaymentContext";

const CheckoutButton = () => {
  const history = useHistory();
  const { cartProducts } = useContext(CartContext);
  const { setPaymentState } = useContext(PaymentContext);

  const total = cartProducts.reduce((a, b) => a + b.productPrice, 0);
  const handleCheckout = () => {
    setPaymentState({description:`${cartProducts.length} products`,amount:total});
    history.push("/checkout");
  };

  return (
    <div className="card  justify-content-end p-2 m-2 bg-dark checkout-container">
      <h4 className="text-light">
        Subtotal({cartProducts.length} item
        {cartProducts.length > 1 ? "s" : null}):{total}$
      </h4>
      <button onClick={handleCheckout} className="btn btn-primary">
        Proceed to checkout
      </button>
    </div>
  );
};

export default CheckoutButton;
