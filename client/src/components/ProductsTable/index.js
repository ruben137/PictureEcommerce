import React, { useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import ProductsContext from "../../contexts/Products/ProductsContext";
import FormModal from "../FormModal";
import moment from 'moment'
import './styles.css'

const ProductsTable = () => {
  const { products, getProductsAdmin,deleteProduct,cleanProductState } = useContext(ProductsContext);
  useEffect(() => {
    getProductsAdmin();
    return ()=>{
      cleanProductState()}
  }, []);

  return (
    <div  className="text-light p-3 table-container w-100">
      <FormModal/>
      <Table striped bordered hover variant="dark" className="my-2">
        <thead className="text-light">
          <tr>
            <th>#</th>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Available</th>
            <th>Update</th>
            <th>Remove</th>
          </tr>
        </thead>
        {products.map((item) => {
          return (
            <tbody className="text-light" key={item._id}>
              <tr>
                <td>{moment(item.createdAt).fromNow()}</td>
                <td style={{ maxWidth: "100px" }}>
                  <img className="w-100" src={item.productImg} alt="" />
                </td>
                <td>{item.productName}</td>
                <td>{item.productPrice|| 10}$</td>
                <td>{item.isAvailable?'yes':'selled'}</td>
                <td><FormModal {...item} edit={true}/></td>
                <td><button onClick={()=>deleteProduct(item._id)} className="btn btn-danger">Remove</button></td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
};

export default ProductsTable;
