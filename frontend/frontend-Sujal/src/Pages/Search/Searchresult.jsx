import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { searchProducts } from "../../Api/Api";
import { toast } from "react-toastify";

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query) {
      setLoading(true);
      searchProducts(query)
        .then((res) => {
          if (res.data.success === false) {
            toast.error(res.data.message);
          } else {
            setProducts(res.data.products);
            toast.success(res.data.message);
          }
          setLoading(false);
        })
        .catch((error) => {
          toast.error("An error occurred while searching.");
          setLoading(false);
        });
    }
  }, [query]);

  return (
    <div className="container">
      <h2>Search Results for "{query}"</h2>
      {loading ? (
        <div>Loading...</div>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-3">
              <div className="card">
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.productName}</h5>
                  <p className="card-text">Price: Rs.{product.productPrice}</p>
                  <p className="card-text">{product.productDescription}</p>
                  <button className="btn btn-primary">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
