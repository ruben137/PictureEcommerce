import React, { useContext, useEffect, useState } from "react";

import ProductsContext from "../../../contexts/Products/ProductsContext";
import { saveAs } from 'file-saver';

import PurchaseModal from "../../PurchaseModal";
import moment from 'moment'


const Purchase = ({ token }) => {
  const [pic, setPic] = useState(null);
  const { getPurchasedPic } = useContext(ProductsContext);

  useEffect(() => {
    getPurchasedPic(token,setPic);
  }, [getPurchasedPic,token]);

const download = () => {
  const format=pic.productFull.split('.')[pic.productFull.split('.').length-1]
  saveAs(pic.productFull, `image.${format}`);
};

  return (
    <tr>
      <td style={{ width: "200px" }}>
        <p className={{textAlign:'justify'}}>
        {moment(pic?.createdAt).fromNow()}

        </p>
        </td>
      <td style={{ width: "150px" }}>
        <PurchaseModal {...pic}/>
      </td>
      <td>{pic?.productName}</td>
      <td>

          <button onClick={download} className="btn btn-primary">
            Download
          </button>
      
      </td>
    </tr>
  );
};

export default Purchase;
