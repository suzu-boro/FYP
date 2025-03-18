import React, { useState, useEffect } from "react";
import { getAllProducts, addToCart } from "../../../Api/Api"; // Import the addToCart API function
import { Navbar } from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Bowls.css";

const Bowls = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getAllProducts("bowls")
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = async (item) => {
    try {
      const userId = JSON.parse(localStorage.getItem("user"))._id; // Get the userId from localStorage
      let products = [{ ...item, quantity: 1 }];
      const response = await addToCart(userId, products);
      if (response.status == "200") {
        // Successfully added to cart
        // navigate("/cart");
      } else {
        // Handle failure response
        console.error(response.message);
      }
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="category-grid">
          <div className="category-card">
            <Link to="/Bowls">
              <h2>Bowls</h2>
            </Link>
          </div>
          <div className="category-card">
            <Link to="/Mug">
              <h2>Mugs</h2>
            </Link>
          </div>
          <div className="category-card">
            <Link to="/Plates">
              <h2>Plates</h2>
            </Link>
          </div>
          <div className="category-card">
            <Link to="/Vase">
              <h2>Vase</h2>
            </Link>
          </div>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="row">
            {products.map((singleProduct) => (
              <div key={singleProduct._id} className="col-md-3">
                <div className="product card">
                  <img
                    src={singleProduct.productImage}
                    alt={singleProduct.productName}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h3 className="card-title">{singleProduct.productName}</h3>
                    <p className="card-text">
                      Price: Rs.{singleProduct.productPrice}
                    </p>
                    <p className="card-text">
                      {singleProduct.productDescription}
                    </p>
                    <button
                      onClick={() => handleAddToCart(singleProduct)}
                      className="btn btn-primary"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Bowls;
