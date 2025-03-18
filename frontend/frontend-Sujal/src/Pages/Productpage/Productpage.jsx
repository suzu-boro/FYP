import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Productpage.css";

const Productpage = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const handleRemoveFromCart = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="product card">
            <img
              src="/Assets/greenmug.jpg"
              alt="Green Mug"
              className="card-img-top"
            />
            <div className="card-body">
              <h3 className="card-title">Green Coffee Mug</h3>
              <p className="card-text">Price: Rs.399</p>
              <button
                onClick={() =>
                  handleAddToCart({
                    name: "Green Mug",
                    price: 399,
                    quantity: 1,
                    image: "/Assets/greenmug.jpg",
                  })
                }
                className="btn btn-primary"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="product card">
            <img
              src="/Assets/bowl.jpg"
              alt="Soup Bowl"
              className="card-img-top"
            />
            <div className="card-body">
              <h3 className="card-title">Soup Bowl</h3>
              <p className="card-text">Price: Rs.350</p>
              <button
                onClick={() =>
                  handleAddToCart({
                    name: "Soup Bowl",
                    price: 350,
                    quantity: 1,
                    image: "/Assets/bowl.jpg",
                  })
                }
                className="btn btn-primary"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="product card">
            <img
              src="/Assets/cupset.jpg"
              alt="Cup Set"
              className="card-img-top"
            />
            <div className="card-body">
              <h3 className="card-title">Cup Set</h3>
              <p className="card-text">Price: Rs.400</p>
              <button
                onClick={() =>
                  handleAddToCart({
                    name: "Cup Set",
                    price: 400,
                    quantity: 1,
                    image: "/Assets/cupset.jpg",
                  })
                }
                className="btn btn-primary"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="product card">
            <img
              src="/Assets/coffeemug.jpg"
              alt="Coffee Mug"
              className="card-img-top"
            />
            <div className="card-body">
              <h3 className="card-title">Coffee Mug</h3>
              <p className="card-text">Price: Rs.300</p>
              <button
                onClick={() =>
                  handleAddToCart({
                    name: "Coffee Mug",
                    price: 300,
                    quantity: 1,
                    image: "/Assets/coffeemug.jpg",
                  })
                }
                className="btn btn-primary"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Your CART */}
      <div className="cart">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul className="list-group">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="d-flex">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "40px", marginRight: "10px" }}
                  />
                  <div>
                    <h5>{item.name}</h5>
                    <p>Price: Rs{item.price.toFixed(2)}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(index)}
                  className="btn btn-danger btn-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <h3>Total: Rs. {total.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Productpage;
