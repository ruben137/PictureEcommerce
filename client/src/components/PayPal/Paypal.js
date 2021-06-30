import React, { useRef, useEffect, useContext } from "react";
import CartContext from "../../contexts/Cart/CartContext";
import PaymentContext from "../../contexts/Payment/PaymentContext";
import ProductsContext from "../../contexts/Products/ProductsContext";
import { createToken } from "../../utils";
import { useHistory } from "react-router-dom";

export default function Paypal() {
  const paypal = useRef();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile")).result?.userName;
  const { paymentState } = useContext(PaymentContext);
  const { buyProducts } = useContext(ProductsContext);
  const { cartProducts, clearCart } = useContext(CartContext);
  useEffect(() => {
    if (!paymentState.amount) history.push("/");
  }, [paymentState.amount, history]);

  useEffect(() => {
    if (!paymentState.amount) return;
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: paymentState?.description,
                amount: {
                  currency_code: "USD",
                  value: paymentState?.amount,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();

          cartProducts.forEach((el) => {
            el.token = createToken();
          });
          if (order.status === "COMPLETED") {
            buyProducts(user, { products: cartProducts }, history);
            clearCart();
          }
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, [
    buyProducts,
    cartProducts,
    clearCart,
    history,
    paymentState?.amount,
    paymentState?.description,
    user,
  ]);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
