import React, { useContext,useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ProductsContext from "../../contexts/Products/ProductsContext";


import "./styles.css";

function FormModal(props) {
  const { edit } = props;

  const { createProduct, updateProduct,getProduct } = useContext(ProductsContext);
  const initialState = {
    productName: "",
    productImg: "",
    productImgFull: "",
    category:"",
    productDesc: "",
    productPrice: "",
  };
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState(initialState);

  const clear = () => {
    setProduct(initialState);
  };
  const handleClose = () => {
    setShow(false);
    return clear();
  };
  const handleShow = async () => {
    if (edit) {
      getProduct(props._id,setProduct)

    }
    setShow(true);
  };






  const handleSubmit = (e) => {
    e.preventDefault();
    if (!edit) {
      createProduct(product);
    } else {
      updateProduct(product);
    }

    return handleClose();
  };
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Button variant={edit ? "primary" : "success"} onClick={handleShow}>
        {edit ? "Edit product" : "Add new product"}
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
          <Modal.Title className="text-light">
            {edit ? "Edit " : "Add new "}product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                className="bg-dark text-light"
                type="text"
                name="productName"
                placeholder="Enter the name of the product"
                value={product.productName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="bg-dark text-light"
                type="text"
                name="productImg"
                placeholder="Product url"
                value={product.productImg}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="bg-dark text-light"
                type="text"
                name="productImgFull"
                placeholder="Product full url"
                value={product.productImgFull}
                onChange={handleChange}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Control
                className="bg-dark text-light"
                type="text"
                name="productPrice"
                placeholder="Product price"
                value={product.productPrice}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="bg-dark text-light"
                type="text"
                name="productDesc"
                placeholder="Product description"
                value={product.productDesc}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button className="mx-1" variant="primary" type="submit">
              Save Changes
            </Button>
            <Button
              className="mx-1"
              variant="secondary"
              type="button"
              onClick={handleClose}
              required
            >
              Close
            </Button>
          </Form>
        </Modal.Body>
  
      </Modal>
    </>
  );
}

export default FormModal;
