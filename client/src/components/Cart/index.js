import React, { useContext } from "react";
import { Table } from "react-bootstrap";

import CartContext from "../../contexts/Cart/CartContext";
import CartProduct from "./CartProduct";

const Cart = () => {
  const { cartProducts } = useContext(CartContext);

  return (
    <>
      {cartProducts.length && (
        <Table
          striped
          bordered
          hover
          variant="dark"
          className="m-2 table-container"
        >
          <thead>
            <tr>
              <th>Picture</th>
              <th>Price</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.map((product) => {
              return <CartProduct {...product} key={product._id}/>;
            })}
          </tbody>
        </Table>
      )}
      {!cartProducts.length && (
        <div className="card bg-dark p-2 m-2" style={{ flexGrow: 1 }}>
          <h3 className="text-light">
            You don´t have any products in the cart
          </h3>
        </div>
      )}
    </>
  );
};

export default Cart;
