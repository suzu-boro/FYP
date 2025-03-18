const express = require("express");
const {
  addToCart,
  listCart,
  removeCartItems,
} = require("./../controller/cartController");
const router = express.Router();

router.post("/add", addToCart);
router.get("/list", listCart);
router.post("/remove", removeCartItems);

module.exports = router;
