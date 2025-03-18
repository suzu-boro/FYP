import React, { useState, useEffect } from "react";
import { getCartItems, removeFromCart } from "../../../Api/Api"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";

const handlePayment = async (payment_method, cartItems, total) => {
  const cartDetail = JSON.parse(localStorage.getItem("cartDetail")) || [];
  const url = "http://localhost:3000/api/esewa/create";
  const data = {
    amount: total,
    products: cartItems,
    payment_method,
    cart_id: cartDetail._id,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      esewaCall(responseData.formData);
    } else {
      console.error("Failed to fetch:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error during fetch:", error);
  }
};

const esewaCall = (formData) => {
  var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

  var form = document.createElement("form");
  form.setAttribute("method", "POST");
  form.setAttribute("action", path);

  for (var key in formData) {
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", formData[key]);
    form.appendChild(hiddenField);
  }

  document.body.appendChild(form);
  form.submit();
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userDetails = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setLoading(true);
    getCartItems(userDetails._id) // Fetch cart items from the server
      .then((res) => {
        setCartItems(res.data.productsWithDetails);
        localStorage.setItem("cartDetail", JSON.stringify(res.data.cart));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
        setLoading(false);
      });
  }, [userDetails._id]);

  const handleRemoveFromCart = async (index) => {
    const itemToRemove = cartItems[index];
    try {
      // Remove item from the server
      const response = await removeFromCart(
        userDetails._id,
        itemToRemove.productId
      );
      if (response.status == 200) {
        // Update cart in local storage
        const updatedCartItems =
          JSON.parse(localStorage.getItem("cartItems")) || [];
        const newCartItems = updatedCartItems.filter(
          (item) => item._id !== itemToRemove._id
        );
        localStorage.setItem("cartItems", JSON.stringify(newCartItems));
        // Update state
        setCartItems(cartItems.filter((_, i) => i !== index));
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.productPrice * item.quantity,
    0
  );

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {loading ? (
        <div>Loading...</div>
      ) : cartItems.length === 0 ? (
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
                  src={item.productImage}
                  alt={item.productName}
                  style={{ width: "40px", marginRight: "10px" }}
                />
                <div>
                  <h5>{item.productName}</h5>
                  <p>Price: Rs{item.productPrice.toFixed(2)}</p>
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

      <button
        onClick={() => handlePayment("esewa", cartItems, total)}
        className="btn btn-success"
      >
        Handle Esewa Payment
      </button>
    </div>
  );
};

// // API functions
// const removeFromCart = async (userId, productId) => {
//   try {
//     const response = await fetch("http://localhost:3000/api/cart/remove", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ userId, productId }),
//     });
//     return response.json();
//   } catch (error) {
//     console.error("Error removing item from cart:", error);
//     throw error;
//   }
// };

export default Cart;
