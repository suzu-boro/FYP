import React from "react";
import "./About.css"; // Make sure to create an About.css file for custom styles

const About = () => {
  return (
    <div className="about-me container">
      <h1 className="about-title text-center">About Me</h1>
      <section className="about-content">
        <div className="image-text-container">
          <div className="product-card">
            <img
            
              src="/Assets/groot.png"
              alt="Ceramic Pot"
              className="about-image"
            />
          </div>
          <p className="about-paragraph">
            Ceramic pots are crafted from natural clay that is shaped and then
            hardened through a firing process in a kiln. Known for their
            durability and aesthetic appeal, ceramic pots have been used for
            centuries in gardening, cooking, and decorative arts. They offer
            excellent breathability for plant roots, making them ideal for
            gardening, while their varied designs and finishes make them a
            popular choice for home décor. The versatility and timeless beauty
            of ceramic pots make them a staple in both traditional and modern
            settings.
          </p>
        </div>

        <div className="image-text-container reverse">
          <p className="about-paragraph">
            My journey into the world of pottery began as a simple curiosity, a
            fascination with the way clay could be transformed into something
            both functional and beautiful. Over the years, this interest grew
            into a deep passion, as I spent countless hours honing my craft,
            learning from every piece I shaped. Pottery became more than just a
            hobby; it became a way for me to express creativity, connect with
            the earth, and share a timeless art form with others. Recognizing
            the need for a dedicated space where fellow pottery enthusiasts
            could explore, learn, and find unique handcrafted items, I decided
            to create this website. Pots and Clay is not just a store—it's a
            community for pottery lovers. Whether you're an experienced potter
            or someone who simply appreciates the beauty of handmade ceramics,
            this platform is designed to inspire and support your journey. Thank
            you for joining me on this artistic adventure. I hope you find as
            much joy in pottery as I do, and that this site helps you discover
            the perfect pieces to enrich your home and life.
          </p>
          <div className="product-card">
            <img
              src="/Assets/kalibowl.jpg"
              alt="Kalibowl Pot"
              className="about-image"
            />
          </div>
        </div>

        <p className="about-paragraph text-center">
          At Pots and Clay, we believe in the value of handcrafted art. Our
          mission is to provide you with unique and high-quality pottery that
          enhances your living spaces. Thank you for joining us on this artistic
          journey, and we hope you find something special in our collection.
        </p>
      </section>
    </div>
  );
};

export default About;
