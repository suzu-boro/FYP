const CartModel = require("../models/cartModel");
const ProductModel = require("../models/productModel");
const os = require("os");

const addToCart = async (req, res) => {
  const { products, userId } = req.body;
  try {
    const cart = await CartModel.findOne({ userId: userId, status: "active" });

    if (cart) {
      products.forEach((product) => {
        console.log("product", product);
        newProd = {
          productId: product._id,
          quantity: product.quantity,
        };
        cart.products.push(newProd);
      });
      await cart.save();
    } else {
      const newProducts = [];
      products.forEach((product) => {
        newProds = {
          productId: product._id,
          quantity: product.quantity,
        };
        newProducts.push(newProds);
      });
      const newCart = new CartModel({
        userId: userId,
        products: newProducts,
        status: "active",
      });
      console.log("newCart", newCart);
      await newCart.save();
    }
    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const listCart = async (req, res) => {
  const { userId } = req.query;
  // 2. define specific path
  try {
    const cart = await CartModel.findOne({ userId: userId, status: "active" });
    if (!cart) {
      return res.status(200).json({
        success: true,
        message: "No cart found",
        cart: {},
        productsWithDetails: [],
      });
    }
    // Populate product details for each product in the cart
    const productsWithDetails = await Promise.all(
      cart.products.map(async (item) => {
        const product = await ProductModel.findOne({ _id: item.productId });
        return {
          ...item._doc, // Copy existing fields from cart product
          productName: product.productName,
          productPrice: product.productPrice,
          productImage: `${process.env.HOST}:${process.env.PORT}/products/${product.productImage}`,
          productDescription: product.productDescription,
          productCategory: product.productCategory,
        };
      })
    );
    return res.status(200).json({
      success: true,
      message: "Cart detail",
      cart,
      productsWithDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const removeCartItems = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const cart = await CartModel.findOne({ userId: userId, status: "active" });
    if (!cart) {
      return res.status(404).json({
        success: true,
        message: "No cart found",
      });
    }

    let filteredProduct = cart.products.filter((product) => {
      if (product.productId.toString() !== productId) {
        return product;
      }
    });
    cart.products = filteredProduct;
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart detail",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  addToCart,
  listCart,
  removeCartItems,
};
