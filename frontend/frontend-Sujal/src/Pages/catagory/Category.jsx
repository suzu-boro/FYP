import React from "react";
import { Link } from "react-router-dom";
import "./Category.css";

const Category = () => {
  return (
    <div className="categories">
      <h1>Our Categories</h1>
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
            <h2>Vases</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Category;
