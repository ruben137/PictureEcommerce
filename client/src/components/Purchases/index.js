import React, { useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import ProductsContext from "../../contexts/Products/ProductsContext";
import Purchase from "./Purchase";

const Purchases = () => {
  const { purchases, getPurchases } = useContext(ProductsContext);
  useEffect(() => {
    getPurchases();
  }, []);
 

  return (
    <div className="m-2">
      <h1 className="text-light">Purchases</h1>
      {purchases.length > 0 && (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Purchased</th>
              <th>Pic</th>
              <th>Name</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((item) => {
              return <Purchase token={item.token} key={item._id} />;
            })}
          </tbody>
        </Table>
      )}
      {!purchases.length && (
        <div className="card bg-dark p-2 m-2">
          <h3 className="text-light">You don´t have any purchased Products</h3>
        </div>
      )}
    </div>
  );
};

export default Purchases;
