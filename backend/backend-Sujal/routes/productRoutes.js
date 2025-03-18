const router = require("express").Router();
const productController = require("../controller/productController");
const { authGuard, adminGuard } = require("../middleware/authGuard");
// Make a create product API
router.post("/create", productController.createProduct);

// fetch all
// http://localhost:3000/api/product/get_all_products
router.get("/get_all_products", productController.getAllProducts);

// fetch single product
// If POST, body(data)
router.get("/get_single_product/:id", authGuard, productController.getProduct);

// delete Product
router.delete(
  "/delete_product/:id",
  adminGuard,
  productController.deleteProduct
);

// update product
router.put("/update_product/:id", adminGuard, productController.updateProduct);

// search products
router.get("/search_products", productController.searchProducts);

// exporting
module.exports = router;
