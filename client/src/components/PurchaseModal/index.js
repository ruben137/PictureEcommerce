import React, { useState } from 'react'
import {Button,Modal} from 'react-bootstrap'

const PurchaseModal = (props) => {
  const {productFull,productDesc,productName}=props
  const [show, setShow] = useState(false);
  return (
    <>
    
      <img
        className="w-100"
        style={{cursor:'pointer'}}
        src={productFull}
        onClick={() => setShow(true)}
        alt=""
      />

      <Modal
        size="lg"
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton >
          <Modal.Title id="example-modal-sizes-title-lg" className="text-light">
            {productName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div className="w-100 d-flex align-items-center" style={{ flexDirection:'column' }}>
            <img
              style={{width:'65%'}}
              src={productFull}
              onClick={() => setShow(true)}
              alt=""
            />
          <div  style={{width:'65%'}}>
            <p className="text-light text-justify">{productDesc} </p>
          <Button>Download</Button>
          </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PurchaseModal
