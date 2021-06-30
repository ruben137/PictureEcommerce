import React, { useCallback, useEffect, useRef, useState } from "react";

import Product from "./product/index";

import { useHistory } from "react-router";
import useInfinityScroll from "../../customHooks/useInfiniteScroll";

const Products = () => {
  const history = useHistory();
  const [page, setPage] = useState(0);

  const loader = useRef(null);
  const { loading, products, noMore } = useInfinityScroll(page);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 6);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  const handleWatchProduct = (id) => {
    history.push(`/product/${id}`);
  };

  return (
    <div className="container">
      <h3 className="text-center text-light p-2">Find a picture you like</h3>

      <div className="row">
        {products.map((item, index) => {
          return (
            <Product
              item={item}
              key={index}
              handleWatchProduct={handleWatchProduct}
            />
          );
        })}
      </div>
      <div
        style={{ display: products.length ? "block" : "none" }}
        ref={loader}
      />
      {loading && <h3 className="text-center text-light">Loading...</h3>}
      {noMore && (
        <h3 className="text-center text-light">No more products to show</h3>
      )}
    </div>
  );
};

export default Products;
