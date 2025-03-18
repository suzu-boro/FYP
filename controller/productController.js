const path = require("path");
const productModel = require("../models/productModel");
const fs = require("fs");
const { pathToFileURL, URL, fileURLToPath } = require("url");

const createProduct = async (req, res) => {
  // destructuring incoming data
  const { productName, productPrice, productCategory, productDescription } =
    req.body;

  if (
    !productName ||
    !productPrice ||
    !productCategory ||
    !productDescription
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // check product image
  if (!req.files || !req.files.productImage) {
    return res.status(400).json({
      success: false,
      message: "Image not found!!",
    });
  }

  const { productImage } = req.files;

  // Uploading
  // 1. Generate unique name for each file
  const imageName = `${Date.now()}-${productImage.name}`;

  // 2. define specific path
  const imageUploadPath = path.join(
    __dirname,
    `../public/products/${imageName}`
  );

  // 3. Upload to that path (await | trycatch)
  try {
    await productImage.mv(imageUploadPath);

    // save to database
    const newProduct = new productModel({
      productName: productName,
      productPrice: productPrice,
      productCategory: productCategory,
      productDescription: productDescription,
      productImage: imageName,
    });

    const product = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product Created!",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

// fetch all products
// const getAllProducts = async (req, res) => {
//   // #. Try catch
//   try {
//     const category = req.query.category;
//     let query = {};
//     if (category) {
//       query = { productCategory: category.toLowerCase() };
//     }
//     const products = await productModel.find(query);

//     // 2. Send response
//     res.status(201).json({
//       success: true,
//       message: "Product fetched successfully!",
//       products: products,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

const getAllProducts = async (req, res) => {
  try {
    let { category, limit, page } = req.query;
    // If the page is not applied in query
    if (!page) {
      // Make the Default value one
      page = 1;
    }

    if (!limit) {
      limit = 10;
    }

    const offset = (page - 1) * limit;

    let query = {};
    if (category) {
      query = { productCategory: category.toLowerCase() };
    }

    const products = await productModel
      .find(query)
      .skip(offset)
      .limit(parseInt(limit));
    const count = await productModel.countDocuments();

    const totalPage = Math.ceil(count / parseInt(limit));

    const modifiedProducts = products.map((item) => {
      return {
        ...item._doc,
        productImage: `${process.env.HOST}:${process.env.PORT}/products/${item.productImage}`,
      };
    });

    if (page > totalPage) {
      return res.status(400).json({
        success: false,
        message: "Page not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Products fetched successfully.",
        products: modifiedProducts,
        limit: parseInt(limit),
        page: parseInt(page),
        total: count,
        totalPage: totalPage,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

// fetch single product
const getProduct = async (req, res) => {
  // receive id from URL
  const productId = req.params.id;

  try {
    const product = await productModel.findById(productId);
    product.imageUrl = getImageUrl(product.getImageUrl(product.productImage));

    res.status(201).json({
      success: true,
      message: "Product Fetched!",
      product: product,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Server Error!",
    });
  }
};

// delete product
const deleteProduct = async (req, res) => {
  // get product id
  const productId = req.params.id;

  try {
    await productModel.findByIdAndDelete(productId);

    // fetch all products,
    res.status(201).json({
      success: true,
      message: "Product Deleted!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// update product
// 1. Get a update id
// 2. if new image is provided
// 3. Upload (public)
// 4. Delete old Image (Sishir) - Delete product
// 5. update products

const updateProduct = async (req, res) => {
  try {
    // if there is files, upload new & delete old
    if (req.files && req.files.productImage) {
      // # upload new to /public/products
      // 1. Destructure file
      const { productImage } = req.files;

      // 1. Generate unique name for each file
      const imageName = `${Date.now()}-${productImage.name}`;

      // 2. define specific path
      const imageUploadPath = path.join(
        __dirname,
        `../public/products/${imageName}`
      );

      // move to folder
      await productImage.mv(imageUploadPath);

      // replace productImage name to new name
      req.body.productImage = imageName;

      // # Delete Old image
      // Find product Information (We have only ID)
      const existingProduct = await productModel.findById(req.params.id);

      // Search that image in directory
      if (req.body.productImage) {
        // if new image is uploaded, then only remove old image
        const oldImagePath = path.join(
          __dirname,
          `../public/products/${existingProduct.productImage}`
        );

        // delete from file system
        fs.unlinkSync(oldImagePath);
      }
    } // if ko closing

    // ----------------------------------------

    // update in database
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    // send a response
    res.status(201).json({
      success: true,
      message: "Product Updated!",
      updatedProduct: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};
// Function to search products
const searchProducts = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({
      success: false,
      message: "Search query is required",
    });
  }

  try {
    // Using a case-insensitive regex search for productName, productCategory, and productDescription
    const products = await productModel.find({
      $or: [
        { productName: { $regex: query, $options: "i" } },
        { productCategory: { $regex: query, $options: "i" } },
        { productDescription: { $regex: query, $options: "i" } },
      ],
    });

    const modifiedProducts = products.map((item) => {
      return {
        ...item._doc,
        productImage: `${process.env.HOST}:${process.env.PORT}/products/${item.productImage}`,
      };
    });

    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      products: modifiedProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

// Function to validate password
function getImageUrl(imageName) {
  const baseUrl = `${process.env.HOST}:3000`;
  return baseUrl + ("/products/" + imageName);
}

// Function to validate password
function getImageUrl(imageName) {
  const baseUrl = `${process.env.HOST}:3000`;
  return baseUrl + ("/products/" + imageName);
}
module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  searchProducts,
};
