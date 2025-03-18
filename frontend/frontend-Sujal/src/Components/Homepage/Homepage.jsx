import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";

const Homepage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Pots and Clay</h1>
          <p>Discover the finest handcrafted pots and clay art pieces</p>
        </div>
      </section>

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <Link to="/About" className="nav-button">
          About Me
        </Link>
        <Link to="/" className="nav-button">
          Services
        </Link>
        <Link to="/bowls" className="nav-button">
          Products
        </Link>
      </div>

      {/* Featured Products Section */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          <div className="product-card">
            <img src="/Assets/ceramicbowls.jpg" alt="Product 1" />
          </div>
          <div className="product-card">
            <img src="/Assets/plates.jpg" alt="Product 2" />
          </div>
          <div className="product-card">
            <img src="/Assets/lotsofcup.jpg" alt="Product 3" />
          </div>
          <div className="product-card">
            <img src="/Assets/groot.png" alt="Product 4" />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us">
        <h2>About Us</h2>
        <p>
          At Pots and Clay, we believe in the art of handcrafted pottery. Our
          collection features a variety of unique and beautiful clay pots and
          decorative items made by skilled artisans. Each piece is crafted with
          care and attention to detail, ensuring that you get the highest
          quality products for your home and garden.
        </p>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <h2>Contact Us</h2>
        <p>
          Have any questions? Reach out to us at{" "}
          <a href="suzalpraz53gmail.com">suzalpraz53@gmail.com</a>
        </p>
      </section>
    </div>
  );
};

export default Homepage;
