import { useState, useEffect, useCallback } from "react";
import * as api from "../contexts/api";

function useInfinityScroll(page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [noMore, setNoMore] = useState(false);

  const sendQuery = useCallback(async () => {
    try {
      if (!noMore) {
        await setLoading(true);
        await setError(false);
        const { data } = await api.fetchProducts(page);
        if (!data.length) setNoMore(true);

        await setProducts((prev) => [...prev, ...data]);

        setLoading(false);
      }
    } catch (err) {
      setError(err);
    }
  }, [page]);

  useEffect(() => {
    sendQuery();
  }, [sendQuery, page]);

  return { loading, error, products, noMore };
}

export default useInfinityScroll;
